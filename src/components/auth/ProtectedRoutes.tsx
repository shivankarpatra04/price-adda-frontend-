"use client"

import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children?: ReactNode;
    userType: 'admin' | 'super-admin' | 'user';
    redirectTo?: string;
}

const ProtectedRoute = ({ children, userType, redirectTo }: ProtectedRouteProps) => {
    const { isAuthenticated, userType: currentUserType } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
                await router.push(`/${userType}/login`);
            } else if (currentUserType !== userType) {
                await router.push(redirectTo || '/');
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [isAuthenticated, currentUserType, userType, router, redirectTo]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated && currentUserType === userType ? <>{children}</> : null;
};
export default ProtectedRoute;