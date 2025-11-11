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
  const colorMap: { [key: string]: string } = {
    'seyahat': 'from-blue-500 to-cyan-500',
    'kultur': 'from-purple-500 to-pink-500',
    'yemek': 'from-orange-500 to-red-500',
    'macera': 'from-green-500 to-emerald-500',
    'rehber': 'from-yellow-500 to-orange-500',
  }
  
  return colorMap[slug.toLowerCase()] || 'from-gray-500 to-slate-500'
}

export default function CategoriesCard() {
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
            <p className="text-gray-500 text-lg">Henüz kategori bulunmuyor</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link 
            href={`/${category.slug}`} 
            key={category.id}
            className="group"
          >
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-gray-300">
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryColor(category.slug)} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {getCategoryIcon(category.slug)}
                </div>
                
                <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 flex items-center justify-between">
                  {category.name}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                </CardTitle>
                
                <CardDescription className="text-gray-600 line-clamp-2">
                  {category.description || 'Bu kategoride seyahat deneyimlerini keşfedin'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center text-sm text-gray-500">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Keşfetmeye başla</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}