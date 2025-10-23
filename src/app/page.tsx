import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()

  
  const { data: categories, error: categoriesError } = await supabase.from('Categories').select('*')
  const { data: countries, error: countriesError } = await supabase.from('Countries').select('*')
  const { data: posts, error: postsError } = await supabase.from('Posts').select('*, Countries(name, flag)')

  /*
    altdaki konsol çıktıları, projede hep kalabilir
    fakat şuanda sadece verileri test etmek için varlar 
    BU KISIMI SİLMEYİN!!!
    BEDİRHAN HOCAM İSTERSE SİLEBİLİR AMA BEN KALMASINI TERCİH EDERİM :D
  */
  console.log('Categories data:', categories)
  console.log('Countries data:', countries)
  console.log('Posts data:', posts)

  if (categoriesError || countriesError || postsError) {
    const error = categoriesError || countriesError || postsError
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Supabase Hatası</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800"><strong>Hata:</strong> {error?.message}</p>
          <p className="text-red-600 mt-2"><strong>Kod:</strong> {error?.code}</p>
          <p className="text-red-600 mt-2"><strong>Detay:</strong> {error?.details}</p>
        </div>
      </div>
    )
  }

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

      {countries && countries.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ülkeler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country: any) => (
              <div key={country.id} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <h3 className="font-semibold">{country.name}</h3>
                    <p className="text-sm text-gray-500">Kod: {country.code}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Postlar</h2>
          <div className="space-y-4">
            {posts.map((post: any) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    {post.Countries && (
                      <p className="text-sm text-gray-600 mt-1">
                        {post.Countries.flag} {post.Countries.name}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    ID: {post.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {categories && categories.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Kategoriler</h2>
          <ul className="space-y-2">
            {categories.map((category: any) => (
              <li key={category.id} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-600 mt-1">{category.description}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">Slug: {category.slug}</p>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    ID: {category.id}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
