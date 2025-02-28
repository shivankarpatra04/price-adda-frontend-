"use client";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserType } from '@/types/auth';
import { useRouter } from 'next/navigation';

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
            await signup(formData.username, formData.email, formData.password, userType);
            // Redirect based on role
            const redirectPath = {
                'admin': '/admin/dashboard',
                'super-admin': '/super-admin/dashboard',
                'user': '/home'
            }[userType] || '/home';
            
            router.push(redirectPath);
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {loading ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
    );
}