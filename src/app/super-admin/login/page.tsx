'use client';

import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function SuperAdminLogin() {
    return (
        <div>
            
            <LoginForm userType="super-admin" />
            
            
        </div>
    );
}
