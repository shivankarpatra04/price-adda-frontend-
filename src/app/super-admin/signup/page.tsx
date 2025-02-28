import SignupForm from '@/components/auth/SignupForm';

export default function SuperAdminSignup() {
    return (
        <div className="container mx-auto p-4">
            
            <SignupForm userType="super-admin" />
            
        </div>
    );
}