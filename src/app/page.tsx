"use client"
import { useAuth } from '@/components/auth/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RootPage() {
  const { isAuthenticated, userType } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && userType === 'user') {
      router.replace('/home')
    } else {
      router.replace('/user/login')
    }
  }, [isAuthenticated, userType])

  return <div className="flex items-center justify-center h-screen">Loading...</div>
}
