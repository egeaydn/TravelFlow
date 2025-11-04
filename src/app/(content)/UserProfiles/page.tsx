'use client'

import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { User, Mail, Calendar, MapPin, Globe, UserCheck, FileText, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import LikeButton from '@/components/LikeButton'

interface UserProfile {
  id: number
  user_id: string
  email: string
  full_name: string
  username: string
  bio: string
  avatar_url: string
  website_url: string
  location: string
  preferred_language: string
  is_verified: boolean
  country_visited: number
  total_posts: number
  total_followers: number
  total_following: number
  created_at: string
}

interface Post {
  id: string
  title: string
  slug: string
  created_at: string
}

interface Comment {
  id: string
  content: string
  created_at: string
  post_id: string
  Posts?: {
    title: string
    slug: string
  } | null
}

export default function UserProfilesPage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [userComments, setUserComments] = useState<Comment[]>([])
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts')
  const supabase = createClient()

  useEffect(() => {
    if (user && !loading) {
      fetchUserProfile()
      fetchUserPosts()
      fetchUserComments()
    }
  }, [user, loading])

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('UserProfiles')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Profile yüklenemedi:', error)
    } finally {
      setProfileLoading(false)
    }
  }

  const fetchUserPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .select(`
          id,
          title,
          slug,
          created_at,
          country_id,
          category_id
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setUserPosts(data as Post[] || [])
    } catch (error) {
      console.error('Posts yüklenemedi:', error)
    }
  }

  const fetchUserComments = async () => {
    try {
      const { data, error } = await supabase
        .from('Comments')
        .select(`
          id,
          content,
          created_at,
          post_id
        `)
        .eq('author_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Post bilgilerini ayrı olarak çek
      const commentsWithPosts = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: postData } = await supabase
            .from('Posts')
            .select('title, slug')
            .eq('id', comment.post_id)
            .single()
          
          return {
            ...comment,
            Posts: postData
          }
        })
      )
      
      setUserComments(commentsWithPosts)
    } catch (error) {
      console.error('Comments yüklenemedi:', error)
    }
  }

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Giriş Yapın</h1>
          <p className="text-gray-600">Profilinizi görmek için giriş yapmanız gerekiyor.</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil Bulunamadı</h1>
          <p className="text-gray-600">Profil bilgileriniz yüklenemedi.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {profile.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile.full_name}</h1>
                {profile.is_verified && (
                  <UserCheck className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <p className="text-gray-600 mb-2">@{profile.username}</p>
              {profile.bio && (
                <p className="text-gray-700 mb-4">{profile.bio}</p>
              )}
              
              <div className="flex justify-center md:justify-start gap-6 text-sm">
                <div className="text-center">
                  <span className="font-semibold text-gray-900">{userPosts.length}</span>
                  <p className="text-gray-600">Paylaşım</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-gray-900">{userComments.length}</span>
                  <p className="text-gray-600">Yorum</p>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">İletişim Bilgileri</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{profile.email}</span>
              </div>
              {profile.website_url && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <a 
                    href={profile.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.website_url}
                  </a>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hesap Bilgileri</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">
                  Katılma: {new Date(profile.created_at).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">
                  Dil: {profile.preferred_language === 'tr' ? 'Türkçe' : 'English'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">
                  Durum: {profile.is_verified ? 'Doğrulanmış' : 'Doğrulanmamış'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts ve Comments Tabs */}
        <div className="bg-white rounded-lg shadow-sm mt-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'posts'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>Paylaşımlarım ({userPosts.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'comments'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Yorumlarım ({userComments.length})</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'posts' ? (
              <div className="space-y-4">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link href={`/post/${post.slug}`}>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                              {post.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-sm text-gray-500">
                              {new Date(post.created_at).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                            <LikeButton targetId={post.id} targetType="post" size="sm" />
                          </div>
                        </div>
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Henüz paylaşım yapmadınız.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {userComments.length > 0 ? (
                  userComments.map((comment) => (
                    <div key={comment.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-700 mb-2">{comment.content}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>
                              {new Date(comment.created_at).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                            {comment.Posts && (
                              <>
                                <span>•</span>
                                <Link
                                  href={`/post/${comment.Posts.slug}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {comment.Posts.title}
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Henüz yorum yapmadınız.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}