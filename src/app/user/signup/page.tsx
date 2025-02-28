import SignupForm from '@/components/auth/SignupForm';


export default function UserSignup() {
    return (
        <div className="container mx-auto p-4">
           
            <SignupForm userType="user" />
           
        </div>
    );
}