'use client';

import Navigation from '@/components/Navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoutes';

export default function AdminPage() {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                    {/* Add your admin dashboard content here */}
                </main>
            </div>
        // </ProtectedRoute>
    );
}