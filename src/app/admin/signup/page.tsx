"use client"
import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function AdminSignup() {
    return (
        <div className="container mx-auto p-4">
            
            <SignupForm userType="admin" />
            
        </div>
    );
}