"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/home')
  }, [router])

  return <div className="flex items-center justify-center h-screen">Loading...</div>
}
