'use client'

import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { User, Mail, Calendar, MapPin, Globe, UserCheck } from 'lucide-react'

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

export default function UserProfilesPage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (user && !loading) {
      fetchUserProfile()
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
                  <span className="font-semibold text-gray-900">{profile.total_posts}</span>
                  <p className="text-gray-600">Paylaşım</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-gray-900">{profile.total_followers}</span>
                  <p className="text-gray-600">Takipçi</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-gray-900">{profile.total_following}</span>
                  <p className="text-gray-600">Takip</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold text-gray-900">{profile.country_visited}</span>
                  <p className="text-gray-600">Ülke</p>
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
      </div>
    </div>
  )
}