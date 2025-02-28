'use client';

import Navigation from '@/components/Navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoutes';

export default function AdminPage() {
    return (
        <ProtectedRoute userType="admin">
            <div className="min-h-screen flex flex-col">
                <Navigation />
            </div>
        </ProtectedRoute>
    );
}
