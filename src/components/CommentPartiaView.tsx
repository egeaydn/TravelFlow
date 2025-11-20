'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { MessageCircle, Send, User, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Comment {
  id: string
  content: string
  created_at: string
  author_id: string
  post_id: string
  UserProfiles?: {
    full_name: string
  }
}

interface CommentPartialViewProps {
  postId: string
}

export default function CommentPartialView({ postId }: CommentPartialViewProps) {
  const t = useTranslations('comments')
  const { user } = useAuth()
  const supabase = createClient()
  
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Yorumları çek
  const fetchComments = async () => {
    setLoading(true)
    console.log('Fetching comments for postId:', postId, typeof postId)
    
    if (!postId) {
      console.error('PostId is undefined')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('Comments')
        .select(`
          *,
          UserProfiles!Comments_author_id_fkey(full_name)
        `)
        .eq('post_id', String(postId))
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Comments fetch error:', JSON.stringify(error, null, 2))
        console.error('Error details:', error.message, error.code, error.details)
      } else if (data) {
        console.log('Comments data:', data)
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleDelete = async (commentId: string, authorId: string) => {
    if (!user || user.id !== authorId) {
      alert('Bu yorumu silemezsiniz!')
      return
    }

    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('Comments')
        .delete()
        .eq('id', commentId)

      if (error) throw error

      fetchComments()
    } catch (error: any) {
      console.error('Comment delete error:', error)
      alert('Yorum silinirken hata oluştu: ' + error.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Yorum yapmak için giriş yapmalısınız!')
      return
    }

    if (!newComment.trim()) {
      return
    }

    setSubmitting(true)
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('UserProfiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      console.log('User profile check:', { 
        userId: user.id, 
        profileData, 
        profileError 
      })

      const { data, error } = await supabase
        .from('Comments')
        .insert([
          {
            content: newComment.trim(),
            post_id: String(postId),
            author_id: user.id
          }
        ])
        .select()

      if (error) {
        throw error
      }

      // Yorum başarıyla eklendi, listeyi yenile
      setNewComment('')
      fetchComments()
      
    } catch (error: any) {
      console.error('Comment submit error:', error)
      alert('Yorum gönderilirken hata oluştu: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      
      <div className="flex items-center mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          {t('title')} ({comments.length})
        </h2>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t('writeComment')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {newComment.length}/500 {t('characters')}
                </span>
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{submitting ? t('sending') : t('send')}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <p className="text-gray-600 text-center">
            {t('loginToComment')} 
            <a href="/login" className="text-blue-600 hover:text-blue-800 ml-1">{t('loginLink')}</a>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-2">{t('loading')}</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {comment.UserProfiles?.full_name || t('anonymous')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {user && user.id === comment.author_id && (
                    <button
                      onClick={() => handleDelete(comment.id, comment.author_id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Yorumu sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">{t('noCommentsYet')}</p>
            <p className="text-gray-400 text-sm">{t('beFirst')}</p>
          </div>
        )}
      </div>
    </div>
  )
}