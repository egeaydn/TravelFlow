import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { MapPin, Calendar, Eye, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import LikeButton from '@/components/LikeButton'

interface CountryDetailPageProps {
  params: {
    code: string
  }
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
  const supabase = await createClient()
  
  const { data: country, error: countryError } = await supabase
    .from('Countries')
    .select('*')
    .eq('code', params.code.toUpperCase())
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
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/Countries"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tüm Ülkelere Dön</span>
            </Link>
          </div>

          <div className="bg-white-100 rounded-lg shadow-sm p-8 mb-12 ">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24  rounded-lg flex items-center justify-center">
                   <img
                      src={country.flag_url }
                      alt={country.name}
                      width={300}
                      height={100}
                      className="object-cover"
                    />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {country.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm font-medium">Kod: {country.code}</span>
                  </div>
                  <div className="bg-gray-100 rounded-md px-3 py-1 flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm font-medium">
                      {posts?.length || 0} Paylaşım
                    </span>
                  </div>
                </div>
                
                {country.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {country.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {country.name}'daki Seyahat Hikayeleri
            </h2>
            <p className="text-gray-600">
              Bu ülkeden paylaşılan deneyimleri ve hikayeleri keşfedin
            </p>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-shadow duration-200 border border-gray-200"
                >
                  {post.featured_image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category Badge */}
                    {post.Categories && (
                      <div className="mb-3">
                        <Link
                          href={`/${post.Categories.slug}`}
                          className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          {post.Categories.name}
                        </Link>
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {post.Countries && (
                          <>
                            <span>{post.Countries.flag}</span>
                            <span>{post.Countries.code}</span>
                          </>
                        )}
                      </div>

                      <div className="ml-auto">
                        <LikeButton targetId={post.id} targetType="post" size="sm" />
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/post/${post.slug}`}
                      className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
                    >
                      Devamını Oku
                      <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (//burası koşula bağlu şekilkde eğer post yolsa çaılışacak kısım
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg mb-6">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {country.name}'dan henüz paylaşım yok
              </h3>
              <p className="text-gray-600 mb-6">
                Bu ülkeden ilk seyahat hikayesini sen paylaş!
              </p>
              <Link
                href="/createPost"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Post Paylaş
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

