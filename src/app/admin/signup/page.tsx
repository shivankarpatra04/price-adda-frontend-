"use client"
import SignupForm from '@/components/auth/SignupForm';

export default function AdminSignup() {
    return (
        <div className="container mx-auto p-4">
            
            <SignupForm userType="admin" />
            
        </div>
    );
}