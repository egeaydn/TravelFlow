'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Compass, 
  Camera, 
  Utensils, 
  Mountain, 
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  created_at: string
}

const getCategoryIcon = (slug: string) => {
  const iconMap: { [key: string]: any } = {
    'seyahat': Compass,
    'kultur': Sparkles,
    'yemek': Utensils,
    'macera': Mountain,
    'rehber': BookOpen,
  }
  
  const IconComponent = iconMap[slug.toLowerCase()] || Camera
  return <IconComponent className="w-8 h-8" />
}

// Kategori renklerini eşleştir
const getCategoryColor = (slug: string) => {
  return 'from-gray-500 to-slate-500'
}

export default function CategoriesCard() {
  const t = useTranslations('categories')
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('Categories')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        console.error('Categories fetch error:', error)
      } else if (data) {
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <Card className="text-center py-12">
          <CardContent>
            <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">{t('noCategories')}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link 
          href={`/${category.slug}`} 
          key={category.id}
          className="group"
        >
          <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white border border-gray-200 hover:border-gray-400 rounded-xl overflow-hidden">
            <CardHeader className="space-y-4 p-6">
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {getCategoryIcon(category.slug)}
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 flex items-center justify-between transition-colors">
                  <span>{category.name}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                </CardTitle>
                
                <CardDescription className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {category.description || 'Bu kategoride seyahat deneyimlerini keşfedin'}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}