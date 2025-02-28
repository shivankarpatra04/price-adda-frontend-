'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoutes';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
    // यह लॉगिंग हमें समस्या की जांच करने में मदद करेगा
    const auth = useAuth();
    console.log('HomePage Auth State:', { 
        isAuthenticated: auth.isAuthenticated, 
        userType: auth.userType, 
        loading: auth.loading 
    });

    return (
        <ProtectedRoute allowedRoles={['user']}>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
                <p className="text-lg">This is the main landing page for all users.</p>
            </main>
        </ProtectedRoute>
    );
}