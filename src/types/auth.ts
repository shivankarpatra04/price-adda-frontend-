export type UserType = 'user' | 'admin' | 'super-admin';

export interface User {
    _id: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
    roles: UserType[];
}
