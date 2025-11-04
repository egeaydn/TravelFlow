'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  targetId: string  
  targetType?: 'post' | 'comment'  
  showCount?: boolean  
  size?: 'sm' | 'md' | 'lg'
}

export default function LikeButton({ 
  targetId, 
  targetType = 'post',
  showCount = true,
  size = 'md'
}: LikeButtonProps) {
  const { user } = useAuth()
  const supabase = createClient()
  
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userProfileId, setUserProfileId] = useState<number | null>(null)

  // Icon boyutları
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // Like durumunu ve sayısını kontrol et
  useEffect(() => {
    if (user) {
      fetchUserProfileId()
    }
  }, [user])

  useEffect(() => {
    if (userProfileId) {
      checkLikeStatus()
    }
    fetchLikeCount()
  }, [targetId, userProfileId])

  const fetchUserProfileId = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('UserProfiles')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setUserProfileId(data.id)
      }
    } catch (error) {
      console.error('UserProfile fetch error:', error)
    }
  }

  const checkLikeStatus = async () => {
    if (!userProfileId) return

    try {
      const { data, error } = await supabase
        .from('Likes')
        .select('id')
        .eq('user_id', userProfileId)
        .eq('target_type', targetType)
        .eq('target_id', targetId)
        .single()

      if (data) {
        setIsLiked(true)
      }
    } catch (error) {
      // Beğeni yoksa hata döner, bu normal
      setIsLiked(false)
    }
  }

  const fetchLikeCount = async () => {
    try {
      const { count, error } = await supabase
        .from('Likes')
        .select('*', { count: 'exact', head: true })
        .eq('target_type', targetType)
        .eq('target_id', targetId)

      if (!error && count !== null) {
        setLikeCount(count)
      }
    } catch (error) {
      console.error('Like count fetch error:', error)
    }
  }

  const handleLike = async () => {
    if (!user || !userProfileId) {
      alert('Beğenmek için giriş yapmalısınız!')
      return
    }

    setLoading(true)

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('Likes')
          .delete()
          .eq('user_id', userProfileId)
          .eq('target_type', targetType)
          .eq('target_id', targetId)

        if (error) throw error

        setIsLiked(false)
        setLikeCount(prev => Math.max(0, prev - 1))
      } else {
        // Like
        const { error } = await supabase
          .from('Likes')
          .insert([
            {
              user_id: userProfileId,
              target_type: targetType,
              target_id: targetId
            }
          ])

        if (error) throw error

        setIsLiked(true)
        setLikeCount(prev => prev + 1)
      }
    } catch (error: any) {
      console.error('Like error:', error)
      alert('Bir hata oluştu: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 transition-all ${
        isLiked 
          ? 'text-red-600 hover:text-red-700' 
          : 'text-gray-600 hover:text-red-600'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Heart 
        className={`${iconSizes[size]} transition-all ${
          isLiked ? 'fill-current' : ''
        }`}
      />
      {showCount && (
        <span className="text-sm font-medium">
          {likeCount}
        </span>
      )}
    </button>
  )
}
