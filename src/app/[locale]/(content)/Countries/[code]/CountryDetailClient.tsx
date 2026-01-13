'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Eye, ArrowLeft, Sparkles, TrendingUp, BookOpen } from 'lucide-react'
import PostCard from '@/components/PostCard'

interface CountryDetailClientProps {
  country: {
    id: number
    name: string
    name_en: string
    code: string
    flag_url: string
    description?: string
    continent?: string
  }
  posts: any[]
  translations: {
    backToCountries: string
    code: string
    posts: string
    storiesFrom: string
    discoverStories: string
    noPosts: string
    beFirstToShare: string
    sharePost: string
    readMore: string
  }
}

export default function CountryDetailClient({ country, posts, translations }: CountryDetailClientProps) {
  const stats = [
    {
      icon: BookOpen,
      label: translations.posts,
      value: posts.length,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      label: 'Popülerlik',
      value: posts.length > 5 ? 'Yüksek' : posts.length > 2 ? 'Orta' : 'Düşük',
      color: 'from-emerald-500 to-emerald-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/Countries"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">{translations.backToCountries}</span>
            </Link>
          </motion.div>

          {/* Country Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Flag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                <img
                  src={country.flag_url}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                {country.name}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {country.name_en}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 border border-white/20">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">
                    {translations.code}: {country.code}
                  </span>
                </div>
                
                {country.continent && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <span className="text-white text-sm font-semibold">
                      {country.continent}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {country.description && (
                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  {country.description}
                </p>
              )}
            </motion.div>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {translations.storiesFrom}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {translations.discoverStories}
            </p>
          </motion.div>

          {/* Posts Grid */}
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {translations.noPosts}
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {translations.beFirstToShare}
              </p>
              <Link
                href="/createPost"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                {translations.sharePost}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
