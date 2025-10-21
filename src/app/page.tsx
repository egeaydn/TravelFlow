import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()

  console.log('Supabase client created')
  
  const { data: categories, error } = await supabase.from('Categories').select('*')

  console.log('Categories data:', categories)
  console.log('Categories error:', error)

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Supabase Hatası</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800"><strong>Hata:</strong> {error.message}</p>
          <p className="text-red-600 mt-2"><strong>Kod:</strong> {error.code}</p>
          <p className="text-red-600 mt-2"><strong>Detay:</strong> {error.details}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kategoriler</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p><strong>Veri durumu:</strong> {categories ? `${categories.length} kategori bulundu` : 'Veri null'}</p>
      </div>

      {categories && categories.length > 0 ? (
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
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Henüz kategori bulunamadı veya RLS politikası engelleme yapıyor.</p>
          <p className="text-yellow-600 mt-2 text-sm">
            Supabase'de Categories tablosuna erişim politikalarını kontrol edin.
          </p>
        </div>
      )}
    </div>
  )
}
