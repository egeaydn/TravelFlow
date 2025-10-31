import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Page() {
  const supabase = await createClient()

  const { data: categories, error: categoriesError } = await supabase.from('Categories').select('*')
  const { data: countries, error: countriesError } = await supabase.from('Countries').select('*')
  const { data: posts, error: postsError } = await supabase.from('Posts').select(`
    *, 
    Countries(name, flag),
    UserProfiles!fk_posts_user_id(full_name)
  `)
  //aşşağıdaki kısım bir adminpanaeli görevi görüyor şuanlık burada duruyor
  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <h1 className='font-bold text-5xl text-red-500 text-center'>Burada şuanlık Test verileri tutulmaktadır ayağını denk al!!!</h1>
      <h1 className="text-3xl font-bold mb-6">Veri Durumu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Kategoriler</h2>
          <p className="text-blue-600">{categories ? `${categories.length} kategori` : 'Veri yok'}</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Ülkeler</h2>
          <p className="text-green-600">{countries ? `${countries.length} ülke` : 'Veri yok'}</p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">Postlar</h2>
          <p className="text-purple-600">{posts ? `${posts.length} post` : 'Veri yok'}</p>
        </div>
      </div>

      {/* aşağıya postları şimdilik basdtım */}

      {posts && posts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Son Postlar</h2>
          <div className="space-y-4">
            {posts.map((post: any) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <Link href={`/post/${post.slug || post.id}`} className="block">
                      <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">{post.title}</h3>
                    </Link>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-3">{post.excerpt}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                         {`${post.UserProfiles?.full_name || ''}`.trim() || 'Anonim'}
                      </span>
                      
                      {post.Countries && (
                        <span className="flex items-center">
                           {post.Countries.flag} {post.Countries.name}
                        </span>
                      )}
                      
                      <span>
                         {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </span>
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
                  <div className="text-right text-sm text-gray-400 ml-4">
                    <div>ID: {post.id}</div>
                    <div>Slug: {post.slug || 'Boş'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
