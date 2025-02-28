"use client";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { TextField, Button,Typography, Alert, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthFormLayout from '@/components/auth/AuthFormLayout';
import Link from 'next/link';

interface SignupFormProps {
    userType: UserType;
}

export default function SignupForm({ userType }: SignupFormProps) {
    const router = useRouter();
    const { signup, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch(`${process.env.API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                    roles: [userType]
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                const redirectPath = {
                    'admin': '/admin',
                    'super-admin': '/super-admin',
                    'user': '/home'
                }[userType] || '/home';

                router.push(redirectPath);
            } else {
                throw new Error(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    // Rest of your form JSX remains the same
    return (
        <AuthFormLayout
            title="Create Account"
            subtitle="Join us to get started"
        >
            <Box component="form" onSubmit={handleSubmit} noValidate>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </LoadingButton>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Link 
                        href={`/${userType}/login`} 
                        style={{ 
                            color: '#1976d2',
                            textDecoration: 'none',
                        }}
                    >
                        Login here
                    </Link>
                </Typography>
            </Box>
        </AuthFormLayout>
    );
}