'use client'

import { createClient } from '@/utils/supabase/client'
import { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      // Profile kontrolünü şimdilik devre dışı bırakalım
      // if (event === 'SIGNED_IN' && session?.user) {
      //   try {
      //     await ensureUserProfile(session.user)
      //   } catch (error) {
      //     console.error('Profile kontrol hatası:', error)
      //   }
      // }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    
    if (error) throw error

    // Artık trigger otomatik olarak UserProfiles'a kaydedecek
    console.log('Kayıt başarılı:', data.user?.email)
  }

  const createUserProfile = async (userId: string, email: string, fullName: string) => {
    const { error } = await supabase
      .from('UserProfiles')
      .insert([
        {
          user_id: userId,
          email: email,
          full_name: fullName,
        }
      ])
    
    if (error) throw error
  }

  const ensureUserProfile = async (user: User) => {
    // Kullanıcının profile'ı var mı kontrol et
    const { data: existingProfile, error: checkError } = await supabase
      .from('UserProfiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = "not found" error, bu normal
      throw checkError
    }

    // Eğer profile yoksa oluştur
    if (!existingProfile) {
      const fullName = user.user_metadata?.full_name || 
                      user.user_metadata?.name || 
                      user.email?.split('@')[0] || 
                      'Anonim Kullanıcı'
      
      await createUserProfile(user.id, user.email || '', fullName)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}