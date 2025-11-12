'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageSquare, User, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Comments {
  id: number
  content: string
  created_at: string
  author_id: string
  post_id: number
  UserProfiles: {
    full_name: string
    avatar_url: string | null
  } | null
  Posts: {
    id: number
    title: string
    slug: string
  } | null
}

export default function UserComments() {
  const [comments, setComments] = useState<Comments[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('Comments')
        .select(`
          id,
          content,
          created_at,
          author_id,
          post_id,
          UserProfiles!Comments_author_id_fkey (
            full_name,
            avatar_url
          ),
          Posts!Comments_post_id_fkey (
            id,
            title,
            slug
          )
        `)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      console.log('Comments data:', data)
      
      if (data) {
        const validComments = data.filter(
          (comment: any) => comment.UserProfiles && comment.Posts
        )
        setComments(validComments as any)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }


  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 animate-pulse mb-4" />
            <p className="text-gray-500">Yorumlar yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Henüz yorum yapılmamış</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.map((comment) => {
            if (!comment.UserProfiles || !comment.Posts) return null
            
            return (
            <Card 
              key={comment.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold overflow-hidden">
                    {comment.UserProfiles.avatar_url ? (
                      <img 
                        src={comment.UserProfiles.avatar_url} 
                        alt={comment.UserProfiles.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{comment.UserProfiles.full_name}</p>
                   
                  </div>
                </div>

                <Link 
                  href={`/post/${comment.Posts.slug}`}
                  className="text-sm font-semibold text-gray-700 hover:text-gray-900 line-clamp-1"
                >
                  {comment.Posts.title}
                </Link>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 leading-relaxed line-clamp-4">
                  "{truncateText(comment.content, 150)}"
                </p>

                <Link 
                  href={`/post/${comment.Posts.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:gap-2 transition-all"
                >
                  Gönderiyi Gör
                  <span>→</span>
                </Link>
              </CardContent>
            </Card>
          )})}
        </div>

      </div>
    </div>
  )
}
