'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserType } from '@/types/auth';
import { validateUserRole } from '@/services/roleValidation';

interface AuthContextType {
    isAuthenticated: boolean;
    userType: UserType | null;
    login: (email: string, password: string, userType: UserType) => Promise<void>;
    logout: () => void;
    redirectPath: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userType, setUserType] = useState<UserType | null>(null);
    const [redirectPath, setRedirectPath] = useState('/home');

    useEffect(() => {
        setIsAuthenticated(!!window.localStorage.getItem('token'));
        const user = JSON.parse(window.localStorage.getItem('user') || '{}');
        setUserType(user.type || null);
    }, []);

    const login = async (email: string, password: string, type: UserType): Promise<void> => {
        const loginResponse = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await loginResponse.json();

        if (loginResponse.ok) {
            localStorage.setItem('token', data.response.token);
            localStorage.setItem('user', JSON.stringify(data.response.user));
            
            setIsAuthenticated(true);
            setUserType(type);
            
            const paths = {
                'user': '/home',
                'admin': '/admin',
                'super-admin': '/super-admin'
            };
            setRedirectPath(paths[type]);
        } else {
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUserType(null);
        setRedirectPath('/home');
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userType,
            login,
            logout,
            redirectPath
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
