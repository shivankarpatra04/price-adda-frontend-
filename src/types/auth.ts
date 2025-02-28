export interface User {
    _id: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
    roles: string[];
}

export type UserType = 'user' | 'admin' | 'super-admin';