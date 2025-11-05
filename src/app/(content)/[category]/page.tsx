import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import LikeButton from '@/components/LikeButton'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const supabase = await createClient()
  const { category: categorySlug } = await params
  
  const { data: category } = await supabase
    .from('Categories')
    .select('name, description')
    .eq('slug', categorySlug)
    .single()

  if (!category) {
    return {
      title: 'Kategori Bulunamadı - TravelFlow',
    }
  }

  return {
    title: `${category.name} - TravelFlow`,
    description: category.description || `${category.name} kategorisindeki seyahat deneyimleri`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = await createClient()
  
  const { data: category, error: categoryError } = await supabase
    .from('Categories')
    .select('*')
    .eq('slug', params.category)
    .single()

  if (categoryError) { //burada basit hata kontrolü yaptım
    console.error('Error fetching category:', categoryError)
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Hata!</h1>
          <p className="text-gray-600">Kategori bulunamadı.</p>
        </div>
      </div>
    )
  }

  const { data: posts, error: postsError } = await supabase
    .from('Posts')
    .select(`
      *,
      Countries(name, flag),
      Categories(name, slug)
    `)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false })//burada oluşturulma tarihine göre sıralaması için create_at verisini supabaseden alayıyorum

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-gray-600">{category.description}</p>
          )}
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {post.featured_image_url && (
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <Link href={`/post/${post.slug || post.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt.length > 80 ? post.excerpt.substring(0, 80) + '...' : post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    {post.Countries && (
                      <span className="flex items-center">
                        <span className="mr-1">{post.Countries.flag}</span>
                        {post.Countries.name}
                      </span>
                    )}
                    <span className="flex items-center">
                       {new Date(post.created_at).toLocaleDateString('tr-TR')}
                    </span>
                    <div className="ml-auto">
                      <LikeButton targetId={post.id} targetType="post" size="sm" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link 
                      href={`/post/${post.slug || post.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Devamını Oku →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (//eğer post daha önce paylaşılmadıysa buradan post yok mesajı veriyorum
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bu kategoride henüz post yok
            </h3>
            <p className="text-gray-600">
              İlk postu sen paylaş!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}