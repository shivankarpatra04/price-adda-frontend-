import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

interface User {
    _id: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
}

interface AuthResponse {
    token: string;
    user: User;
}

interface UseAuth {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    verifyEmail: (token: string) => Promise<void>;
}

const API_URL = 'http://localhost:5000/api';

export const useAuth = (): UseAuth => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken) {
            setToken(storedToken);
        }
        
        if (storedUser && storedUser !== 'undefined') {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && typeof parsedUser === 'object') {
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                localStorage.removeItem('user'); // Clean up invalid data
                setUser(null);
            }
        }
        
        setLoading(false);
    }, []);
    

    const login = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
                email,
                password,
            });
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message); // Log the error message
                console.error('Axios error:', err);
            } else {
                setError('An unexpected error occurred');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

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
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
        forgotPassword,
        resetPassword,
        verifyEmail,
    };
};