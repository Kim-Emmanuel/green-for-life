'use client'

import AdminPostManager from '@/components/AdminPostManager'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AdminPostsPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Check if user is authorized
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', {
          credentials: 'include'
        })
        if (!res.ok) {
          router.push('/login')
        } else {
          setIsAuthorized(true)
        }
      } catch {
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Manage Posts</h1>
          <Button
            onClick={() => router.push('/news-resources')}
            variant="outline"
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            Back to Posts
          </Button>
        </div>
        <AdminPostManager />
      </div>
    </div>
  )
}