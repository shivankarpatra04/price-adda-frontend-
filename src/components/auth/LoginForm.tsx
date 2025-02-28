import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
    userType: 'admin' | 'super-admin' | 'user';
}

const LoginForm = ({ userType }: LoginFormProps) => {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password, userType);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Password"
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                type="submit"
                disabled={false}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
Login
            </button>
        </form>
    );
};

export default LoginForm;
