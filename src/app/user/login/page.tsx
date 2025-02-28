"use client"

import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function UserLogin() {
    return (
        <div>
            <LoginForm userType="user" />
           
        </div>
    );
}