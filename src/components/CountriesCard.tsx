'use client'

import { useEffect, useState,} from 'react'
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
import Image from "next/image";
import { useTranslations } from 'next-intl'


interface Country {
    id: number
    name: string
    code: string
    flag: string
    continent: string
    flag_url: string
    post_count?: number
    name_en: string
}

export default function CountriesCard(){
    const t = useTranslations('countries')
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        try{
            // Önce tüm postları çek
            const { data: posts, error: postsError } = await supabase
                .from('Posts')
                .select('country_id')
                .not('country_id', 'is', null)
            
            if (postsError) {
                console.error('Posts fetch error:', postsError)
                return
            }

            const countryPostCounts: { [key: number]: number } = {}
            posts?.forEach(post => {
                if (post.country_id) {
                    countryPostCounts[post.country_id] = (countryPostCounts[post.country_id] || 0) + 1
                }
            })

            const { data, error } = await supabase
                .from('Countries')
                .select('*')
            
            if (error) {
                console.error('Countries fetch error:', error)
            } else if (data) {
                // Post sayılarını ekle
                const countriesWithCounts = data.map(country => ({
                    ...country,
                    post_count: countryPostCounts[country.id] || 0
                }))

                // Post sayısına göre sırala ve ilk 4'ünü al
                const topCountries = countriesWithCounts
                    .sort((a, b) => b.post_count - a.post_count)
                    .slice(0, 4)

                setCountries(topCountries)
            }
        }
        catch (error) {
            console.error('Error fetching countries:', error)
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
if (countries.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <Card className="text-center py-12">
          <CardContent>
            <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">{t('noCountries')}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {countries.map((country) => (
                <Link
                key={country.id}
                href={`/Countries/${country.code}`}
                className="bg-white/300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={country.flag_url}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900 text-center mb-2">
                    {country.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {country.name_en}
                  </p>
                </div>
              </Link>
                      ))}
            </div>
        </div>
    )
}