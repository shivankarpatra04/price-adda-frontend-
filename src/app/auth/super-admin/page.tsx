'use client'

import LoginForm from '@/components/auth/LoginForm'

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <LoginForm userType="admin" />
            </div>
        </div>
    )
}
