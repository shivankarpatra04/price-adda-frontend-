import { UserType } from '@/types/auth';

export const validateUserRole = async (email: string, attemptedRole: UserType): Promise<boolean> => {
    const response = await fetch(`${process.env.API_URL}/auth/validate-role`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            role: attemptedRole
        }),
        credentials: 'include'
    });
    
    const data = await response.json();
    return data.isValidRole;
};

