import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function UserSignup() {
    return (
        <div className="container mx-auto p-4">
           
            <SignupForm userType="user" />
            <p>
                Already have an account? <Link href="/user/login">Login here</Link>
            </p>
        </div>
    );
}