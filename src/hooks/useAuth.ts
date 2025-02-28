'use client';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { validateUserRole } from '@/services/roleValidation';
import { UserType } from '@/types/auth';
import { useRouter } from 'next/navigation'; // Changed to next/navigation
import { useAuth as useAuthContext } from '@/components/auth/AuthContext';



interface User {
    id: string;
    email: string;
    username: string;
    role: UserType;
}

interface AuthResponse {
    response: {
        token: string;
        user: User;
    };
}

interface UseAuth {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    userType: UserType | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, userType: UserType) => Promise<void>;
    signup: (username: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    verifyEmail: (token: string) => Promise<void>;
}

const API_URL = 'http://localhost:5000/api';

export const useAuth = (): UseAuth => {
    const authContext = useAuthContext();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userType, setUserType] = useState<UserType | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedUserType = localStorage.getItem('userType') as UserType | null;
        
        if (storedToken && storedUserType) {
            setToken(storedToken);
            setUserType(storedUserType);
            
            if (storedUser && storedUser !== 'undefined') {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && typeof parsedUser === 'object') {
                        setUser(parsedUser);
                    }
                } catch (error) {
                    console.error('Error parsing user from localStorage:', error);
                    localStorage.removeItem('user');
                    setUser(null);
                }
            }
        }
        
        setLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string, userType: UserType) => {
        try {
            setLoading(true);
            setError(null);
            
            const isValidRole = await validateUserRole(email, userType);
            if (!isValidRole) {
                throw new Error('Invalid role for this user');
            }

            const result = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
                email,
                password
            });

            const { token, user } = result.data.response;
            
            window.localStorage.setItem('token', token);
            window.localStorage.setItem('user', JSON.stringify(user));
            window.localStorage.setItem('userType', userType);

            setToken(token);
            setUser(user);
            setUserType(userType);

            // Redirect based on role
            const routes = {
                'user': '/home',
                'admin': '/admin/dashboard',
                'super-admin': '/super-admin/dashboard'
            } as const;

            router.replace(routes[userType]); // Using replace instead of push
        } catch (err) {
            setError('Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [router]);
    

    const signup = useCallback(async (username: string, email: string, password: string, role: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, {
                username,
                email,
                password,
                roles: [role]
            });
            
            const { token, user } = response.data.response;
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userType', user.role);
            setUserType(user.role);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        setUserType(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
    }, []);

    const forgotPassword = useCallback(async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            await axios.post(`${API_URL}/auth/forgot-password`, { email });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const resetPassword = useCallback(async (token: string, newPassword: string) => {
        try {
            setLoading(true);
            setError(null);
            await axios.post(`${API_URL}/auth/reset-password`, {
                token,
                newPassword,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const verifyEmail = useCallback(async (token: string) => {
        try {
            setLoading(true);
            setError(null);
            await axios.post(`${API_URL}/auth/verify-email`, { token });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        user,
        token,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
        userType,
        forgotPassword,
        resetPassword,
        verifyEmail,
    };
};