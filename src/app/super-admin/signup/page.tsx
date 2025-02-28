import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function SuperAdminSignup() {
    return (
        <div className="container mx-auto p-4">
            
            <SignupForm userType="super-admin" />
            
        </div>
    );
}