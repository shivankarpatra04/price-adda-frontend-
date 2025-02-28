import { UserType } from '@/types/auth';

export const validateUserRole = async (email: string, attemptedRole: UserType): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/validate-role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, role: attemptedRole }),
        });
        
        const data = await response.json();
        return data.isValidRole;
    } catch (error) {
        return false;
    }
};
