"use client"

import ProtectedRoute from '@/components/auth/ProtectedRoutes';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();

    return (
        <ProtectedRoute userType="admin">
            <div className="min-h-screen flex items-center justify-center">
                {/* Landing page content can go here if needed */}
            </div>
        </ProtectedRoute>
    );
}
