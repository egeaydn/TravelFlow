import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { MapPin, Calendar, Eye, ArrowLeft, Sparkles, TrendingUp, BookOpen } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CountryDetailClient from './CountryDetailClient'

interface CountryDetailPageProps {
  params: Promise<{
    code: string
  }>
}

export async function generateMetadata({ params }: CountryDetailPageProps): Promise<Metadata> {
  const supabase = await createClient()
  const { code } = await params
  
  const { data: country } = await supabase
    .from('Countries')
    .select('name, flag')
    .eq('code', code.toUpperCase())
    .single()

  if (!country) {
    return {
      title: 'Ülke Bulunamadı - TravelFlow',
    }
  }

  return {
    title: `${country.name} - TravelFlow`,
    description: `${country.name} seyahat deneyimleri ve gezi rehberi`,
  }
}

export default async function CountryDetailPage({ params }: CountryDetailPageProps) {
  const t = await getTranslations('countryDetail');
  const supabase = await createClient()
  const { code } = await params
  
  const { data: country, error: countryError } = await supabase
    .from('Countries')
    .select('*')
    .eq('code', code.toUpperCase())
    .single()

  if (countryError || !country) {
    notFound()
  }

  const { data: posts, error: postsError } = await supabase
    .from('Posts')
    .select(`
      *,
      Categories(name, slug),
      Countries(name, flag, code)
    `)
    .eq('country_id', country.id)
    .order('created_at', { ascending: false })

  if (postsError) {
    console.error('Error fetching posts:', postsError)
  }

  return (
    <CountryDetailClient 
      country={country} 
      posts={posts || []} 
      translations={{
        backToCountries: t('backToCountries'),
        code: t('code'),
        posts: t('posts'),
        storiesFrom: t('storiesFrom', { country: country.name }),
        discoverStories: t('discoverStories'),
        noPosts: t('noPosts', { country: country.name }),
        beFirstToShare: t('beFirstToShare'),
        sharePost: t('sharePost'),
        readMore: t('readMore')
      }}
    />
  )
}
