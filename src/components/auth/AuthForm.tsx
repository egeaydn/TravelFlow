'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onToggleMode: () => void
  onClose?: () => void
}

export function AuthForm({ mode, onToggleMode, onClose }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          throw new Error('Ad Soyad gerekli')
        }
        await signUp(email, password, fullName)
        alert('Kayıt başarılı! Giriş yapabilirsiniz.')
        onToggleMode() // Login moduna geç
      } else {
        await signIn(email, password)
        onClose?.()
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
        </h2>
        <p className="text-gray-600 mt-2">
          {mode === 'login' 
            ? 'Hesabınıza giriş yapın' 
            : 'TravelFlow\'a katılın'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ad Soyad
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Adınız ve Soyadınız"
                className="pl-10"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şifre
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'İşleniyor...' : (mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol')}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            {mode === 'login' 
              ? 'Hesabınız yok mu? Kayıt olun' 
              : 'Zaten hesabınız var mı? Giriş yapın'
            }
          </button>
        </div>
      </form>
    </div>
  )
}