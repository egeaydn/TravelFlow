'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  
  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) {
      setIsOpen(false)
      return
    }
    
    // Mevcut path'ten locale'i çıkar
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
    
    // Yeni locale ile path oluştur
    const newPath = `/${newLocale}${pathWithoutLocale}`
    
    router.push(newPath)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
        title="Dil Değiştir / Change Language"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase hidden sm:inline">
          {currentLocale}
        </span>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
            <button
              onClick={() => switchLanguage('tr')}
              className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 ${
                currentLocale === 'tr' ? 'bg-gray-50 font-semibold' : ''
              }`}
            >
              <span className="text-2xl">🇹🇷</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Türkçe</div>
                <div className="text-xs text-gray-500">Turkish</div>
              </div>
              {currentLocale === 'tr' && (
                <span className="text-green-600">✓</span>
              )}
            </button>
            
            <div className="h-px bg-gray-200" />
            
            <button
              onClick={() => switchLanguage('en')}
              className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 ${
                currentLocale === 'en' ? 'bg-gray-50 font-semibold' : ''
              }`}
            >
              <span className="text-2xl">🇬🇧</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">English</div>
                <div className="text-xs text-gray-500">İngilizce</div>
              </div>
              {currentLocale === 'en' && (
                <span className="text-green-600">✓</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
