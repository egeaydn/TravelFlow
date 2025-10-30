import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, User, Tag } from 'lucide-react'

interface PostDetailPageProps {
  params: {
    slug: string
  }
}
export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const supabase = await createClient()
  
  const { slug } = await params
  const postSlug = slug
  let post, error;
  
  const slugResult = await supabase
    .from('Posts')
    .select(`
      *,
      Countries(name, flag),
      Categories(name, slug),
      UserProfiles!fk_posts_user_id(full_name),
      Cities(name)
    `)
    .eq('slug', postSlug)
    .single()

  if (slugResult.data) {
    post = slugResult.data
    error = slugResult.error
  } else {
    // Slug bulunamadıysa ID ile dene (sayısal değer ise)
    const isNumeric = /^\d+$/.test(postSlug)
    if (isNumeric) {
      const idResult = await supabase
        .from('Posts')
        .select(`
          *,
          Countries(name, flag),
          Categories(name, slug),
          UserProfiles!fk_posts_user_id(full_name),
          Cities(name)
        `)
        .eq('id', parseInt(postSlug))
        .single()
      
      post = idResult.data
      error = idResult.error
    } else {
      error = slugResult.error
    }
  }

  if (error || !post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {post.featured_image_url && (
            <img 
              src={post.featured_image_url} 
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          )}

          <div className="p-6 md:p-8">
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
              
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>
                  {post.UserProfiles?.full_name || 'Anonim'}
                </span>
              </div>

              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>
                  {post.Countries?.flag} {post.Countries?.name}
                  {post.Cities && `, ${post.Cities.name}`}
                </span>
              </div>

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(post.created_at).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {post.Categories && (
                <Link 
                  href={`/${post.Categories.slug}`}
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  <span>{post.Categories.name}</span>
                </Link>
              )}
            </div>

            {post.excerpt && (
              <div className="text-lg text-gray-700 mb-8 p-4 bg-gray-50 rounded-lg italic">
                {post.excerpt}
              </div>
            )}

            <div className="prose max-w-none text-gray-800 leading-relaxed">
              {post.content.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Etiketler:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </article>

      </div>
    </div>
  )
}