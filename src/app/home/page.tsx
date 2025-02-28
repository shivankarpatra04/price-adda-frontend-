"use client"
import { NextPage } from 'next'
import ProtectedRoute from '@/components/auth/ProtectedRoutes'

const HomePage: NextPage = () => {
    return (
        <ProtectedRoute userType="user" redirectTo="/user/login">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
                <p className="text-lg">This is the main landing page for all users.</p>
            </main>
        </ProtectedRoute>
    )
}

export default HomePage
