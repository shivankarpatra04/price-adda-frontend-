"use client"
import LoginForm from '@/components/auth/LoginForm';

export default function AdminLogin() {
    return (
        <div>
            
            <LoginForm userType="admin" />
            
        </div>
    );
}