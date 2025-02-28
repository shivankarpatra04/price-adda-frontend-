'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { UserType } from '@/types/auth';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: UserType[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const router = useRouter();
    const { isAuthenticated, userType, loading } = useAuth();

    useEffect(() => {
        // Don't do anything while still loading
        if (loading) return;

        // Case 1: User is not authenticated - redirect to appropriate login page
        if (!isAuthenticated) {
            const currentPath = window.location.pathname;
            const loginRoutes = {
                '/admin': '/admin/login',
                '/super-admin': '/super-admin/login',
                '/': '/user/login'  // Default for user paths
            };
            
            // Find the matching route prefix
            const matchingPrefix = Object.keys(loginRoutes)
                .find(prefix => currentPath.startsWith(prefix)) || '/';
            
            router.replace(loginRoutes[matchingPrefix as keyof typeof loginRoutes]);
            return;
        }
        
        // Case 2: User is authenticated but doesn't have permission for this route
        if (userType && !allowedRoles.includes(userType)) {
            const homeRoutes = {
                'user': '/home',
                'admin': '/admin/dashboard',
                'super-admin': '/super-admin/dashboard'
            } as const;
            
            // Redirect to their homepage based on role
            router.replace(homeRoutes[userType as keyof typeof homeRoutes]);
            return;
        }
        
        // Case 3: User is authenticated and has permission - allow access (do nothing)
        
    }, [isAuthenticated, userType, allowedRoles, router, loading]);

    // Only render children when authenticated, loaded, and authorized
    if (loading || !isAuthenticated || !userType || !allowedRoles.includes(userType)) {
        return null;
    }
    
    return <>{children}</>;
}