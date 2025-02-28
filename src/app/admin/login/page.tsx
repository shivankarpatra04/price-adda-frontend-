"use client"
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function AdminLogin() {
    return (
        <div>
            
            <LoginForm userType="admin" />
            
        </div>
    );
}