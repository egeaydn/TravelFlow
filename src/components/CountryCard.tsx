'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Sparkles, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface CountryCardProps {
  country: {
    id: number
    name: string
    name_en: string
    code: string
    flag_url: string
    continent?: string
    Posts?: { count: number }[]
  }
  index: number
}

export default function CountryCard({ country, index }: CountryCardProps) {
  const t = useTranslations('countries')
  const postCount = country.Posts?.[0]?.count || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link
        href={`/Countries/${country.code}`}
        className="block"
      >
        {/* Main Card */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
          
          {/* Flag Image with Overlay */}
          <div className="relative h-56 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              {country.flag_url ? (
                <img
                  src={country.flag_url}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{country.flag_url || '🌍'}</span>
                </div>
              )}
            </motion.div>
            
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Post Count Badge */}
            {postCount > 0 && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-semibold text-gray-900">
                    {postCount} {t('posts')}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Continent Badge */}
            {country.continent && (
              <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                {country.continent}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            {/* Country Name */}
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                {country.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{country.name_en}</span>
              </div>
            </div>

            {/* Code Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono font-semibold">
                {country.code}
              </span>
              {postCount > 0 && (
                <div className="flex items-center gap-1 text-emerald-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Popüler</span>
                </div>
              )}
            </div>

            {/* Hover Arrow */}
            <motion.div 
              className="pt-2 flex items-center text-gray-600 group-hover:text-gray-900 transition-colors"
              initial={{ x: -10, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
            >
              <span className="text-sm font-medium">Keşfet</span>
              <motion.svg
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut" 
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
      </Link>
    </motion.div>
  )
}
