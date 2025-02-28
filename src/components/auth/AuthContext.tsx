'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    userType: UserType | null;
    token: string | null;
    user: any | null;
    login: (userType: UserType, token: string, userData: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        const userType = window.localStorage.getItem('userType') as UserType;
        const storedUser = window.localStorage.getItem('user');
    
        if (token && userType) {
            setIsAuthenticated(true);
            setToken(token);
            setUserType(userType);
            
            if (storedUser && storedUser !== 'undefined') {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && typeof parsedUser === 'object') {
                        setUser(parsedUser);
                    }
                } catch (error) {
                    // Clear invalid user data
                    window.localStorage.removeItem('user');
                    setUser(null);
                }
            }
        }
    }, []);
    
    const login = async (type: UserType, authToken: string, userData: any) => {
        setIsAuthenticated(true);
        setUserType(type);
        setToken(authToken);
        setUser(userData);
        
        localStorage.setItem('userType', type);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect based on user type
        const routes = {
            'user': '/home',
            'admin': '/admin/dashboard',
            'super-admin': '/super-admin/dashboard'
        };
        
        window.location.href = routes[type];
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserType(null);
        setToken(null);
        setUser(null);
        
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            userType, 
            token, 
            user,
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
