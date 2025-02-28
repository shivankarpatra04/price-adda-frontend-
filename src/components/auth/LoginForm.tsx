import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';
import AuthFormLayout from '@/components/auth/AuthFormLayout';
import { TextField, Alert, Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

interface LoginFormProps {
    userType: 'admin' | 'super-admin' | 'user';
}

const LoginForm = ({ userType }: LoginFormProps) => {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const loginResponse = await fetch(`${process.env.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
    
            const data = await loginResponse.json();
    
            if (loginResponse.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.response.token);
                // Store user data with role
                const userData = {
                    ...data.response.user,
                    role: userType // Add the role to user data
                };
                localStorage.setItem('user', JSON.stringify(userData));
    
                await login(formData.email, formData.password, userType);
    
                const redirectPaths = {
                    'user': '/home',
                    'admin': '/admin',
                    'super-admin': '/super-admin'
                };
    
                router.push(redirectPaths[userType]);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };






    return (
        <AuthFormLayout 
            title="Welcome Back" 
            subtitle="Login to your account"
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
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton>
                
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Link 
                        href={`/${userType}/signup`} 
                        style={{ 
                            color: '#1976d2',
                            textDecoration: 'none',
                        }}
                    >
                        Sign up here
                    </Link>
                </Typography>
            </Box>
        </AuthFormLayout>
    );
};
export default LoginForm;
