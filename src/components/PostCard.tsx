'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Tag, Heart } from 'lucide-react'
import LikeButton from './LikeButton'

interface PostCardProps {
  post: {
    id: number
    title: string
    slug: string
    excerpt?: string
    featured_image_url?: string
    created_at: string
    tags?: string[]
    Categories?: {
      name: string
      slug: string
    }
    Countries?: {
      name: string
      flag: string
      code: string
    }
  }
  index: number
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
        
        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="relative h-56 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              <img 
                src={post.featured_image_url} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Category Badge */}
            {post.Categories && (
              <div className="absolute top-4 left-4">
                <Link
                  href={`/${post.Categories.slug}`}
                  className="inline-block bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  {post.Categories.name}
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <Link href={`/post/${post.slug}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500 self-center font-medium">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Date */}
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(post.created_at).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Like Button */}
            <div className="flex items-center gap-2">
              <LikeButton targetId={String(post.id)} targetType="post" size="sm" />
            </div>
          </div>

          {/* Read More Link */}
          <Link
            href={`/post/${post.slug}`}
            className="mt-4 inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors"
          >
            <span>Devamını Oku</span>
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
          </Link>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
    </motion.article>
  )
}
