'use client'

import { useEffect, useState } from 'react'
import { Compass, Camera, Sparkles, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ManualSlider() {
  const t = useTranslations('manualSlider')
  
  const heroQuotes = [
    {
      title: t('discover.title'),
      subtitle: t('discover.subtitle'),
      icon: Compass,
    },
    {
      title: t('share.title'),
      subtitle: t('share.subtitle'),
      icon: Camera,
    },
    {
      title: t('inspire.title'),
      subtitle: t('inspire.subtitle'),
      icon: Sparkles,
    },
    {
      title: t('connect.title'),
      subtitle: t('connect.subtitle'),
      icon: Globe,
    }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentQuote = heroQuotes[currentIndex]
  const IconComponent = currentQuote.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroQuotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] px-4 py-16 text-white">
        
        <div className="mb-6 w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20">
          <IconComponent className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-3 text-center animate-fade-in">
          {currentQuote.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 text-center">
          {currentQuote.subtitle}
        </p>

        <div className="flex gap-2 mt-10">
          {heroQuotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
