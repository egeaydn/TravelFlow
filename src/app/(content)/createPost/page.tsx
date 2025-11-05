"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/utils/supabase/client'
import { 
  Camera, 
  MapPin, 
  Tag, 
  FileText, 
  Save, 
  Eye, 
  Upload,
  X,
  AlertCircle
} from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
}

interface Country {
  id: number
  name: string
  code: string
  flag: string
}

interface City {
  id: number
  name: string
  country_id: number
}

export default function CreatePost() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [countryId, setCountryId] = useState<number | null>(null)
  const [cityId, setCityId] = useState<number | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState('')
  
  const [categories, setCategories] = useState<Category[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  
  const [loading, setLoading] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return // Kullanıcı yoksa veri çekme
    
    const fetchData = async () => {
      try {
        const [categoriesRes, countriesRes, citiesRes] = await Promise.all([
          supabase.from('Categories').select('id, name, slug'),
          supabase.from('Countries').select('id, name, code, flag'),
          supabase.from('Cities').select('id, name, country_id')
        ])

        if (categoriesRes.data) setCategories(categoriesRes.data)
        if (countriesRes.data) setCountries(countriesRes.data)
        if (citiesRes.data) {
          setCities(citiesRes.data)
          console.log('Cities data:', citiesRes.data) // Debug için
          console.log('Cities count:', citiesRes.data.length) // Debug için
        } else {
          console.log('No cities data or error:', citiesRes.error) // Debug için
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user])

  useEffect(() => {
    if (countryId) {
      const filtered = cities.filter(city => city.country_id === countryId)
      setFilteredCities(filtered)
      console.log('Filtered cities for country', countryId, ':', filtered) 
      setCityId(null) 
    } else {
      setFilteredCities([])
      setCityId(null)
    }
  }, [countryId, cities])


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Giriş Gerekli</h2>
          <p className="text-gray-600 mb-4">Post oluşturmak için giriş yapmalısınız.</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!title.trim() || !content.trim() || !categoryId || !countryId) {
        setError('Lütfen tüm zorunlu alanları doldurun.')
        return
      }


      const postData = {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || content.substring(0, 150) + '...',
        category_id: categoryId,
        country_id: countryId,
        city_id: cityId, // Şehir seçilmişse ID'si, seçilmemişse null
        user_id: user.id, // Postu oluşturan kullanıcının ID'si
        featured_image_url: imageUrl.trim() || null,
        tags: tags.trim() ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : null,
        status: 'published',
        created_at: new Date().toISOString()
      }

      console.log('=== POST SUBMIT DEBUG ===')
      console.log('City ID State:', cityId)
      console.log('City ID Type:', typeof cityId)
      console.log('Post Data:', postData)
      console.log('Filtered Cities:', filteredCities)
      console.log('Country ID:', countryId)

      // Eğer cityId varsa ama null geçiyorsa zorla set et
      if (cityId) {
        postData.city_id = Number(cityId)
        console.log('Forced City ID:', postData.city_id)
      }

      const { data, error } = await supabase
        .from('Posts')
        .insert([postData])
        .select()

      if (error) {
        throw error
      }

      setSuccess('Post başarıyla oluşturuldu! 🎉')
      setTimeout(() => {
        router.push('/')
      }, 2000)

    } catch (error: any) {
      setError(error.message || 'Bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yeni Post Oluştur</h1>
          <p className="text-gray-600">Seyahat deneyimlerinizi paylaşın ve keşfetmelerini sağlayın.</p>
        </div>

        {/* Debug Panel */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">🐛 Debug Bilgileri:</h3>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>Country ID: {countryId || 'Seçilmedi'}</div>
            <div>City ID: {cityId || 'Seçilmedi'}</div>
            <div>Filtered Cities: {filteredCities.length} şehir</div>
            <div>Cities Total: {cities.length} şehir</div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <Save className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-green-700">{success}</span>
            </div>
          </div>
        )}

        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreview ? 'Düzenle' : 'Önizle'}</span>
          </button>
        </div>

        {isPreview ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title || 'Post Başlığı'}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                {categoryId && (
                  <span className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {categories.find(c => c.id === categoryId)?.name}
                  </span>
                )}
                {countryId && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {countries.find(c => c.id === countryId)?.flag} {countries.find(c => c.id === countryId)?.name}
                    {cityId && `, ${filteredCities.find(c => c.id === cityId)?.name}`}
                  </span>
                )}
              </div>
              {excerpt && (
                <p className="text-lg text-gray-600 mb-6 italic">{excerpt}</p>
              )}
              <div className="prose max-w-none">
                {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Temel Bilgiler
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Örn: İstanbul'da Gezilecek En Güzel Yerler"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kısa Açıklama
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Postunuzun kısa bir özeti (isteğe bağlı)"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İçerik <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Seyahat deneyiminizi detaylı bir şekilde anlatın..."
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Kategori & Lokasyon
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoryId || ''}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ülke <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={countryId || ''}
                    onChange={(e) => setCountryId(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  >
                    <option value="">Ülke seçin</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {countryId && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir (Opsiyonel)
                  </label>
                  <select
                    value={cityId?.toString() || ''}
                    onChange={(e) => {
                      const selectedCityId = e.target.value ? Number(e.target.value) : null
                      console.log('Selected city ID:', selectedCityId) // Debug için
                      console.log('Select value:', e.target.value) // Debug için
                      setCityId(selectedCityId)
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="">Şehir seçin (isteğe bağlı)</option>
                    {filteredCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {filteredCities.length === 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                      Bu ülke için henüz şehir bilgisi bulunmuyor.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Medya & Etiketler
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fotoğraf URL'si
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  {imageUrl && (
                    <div className="mt-4">
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etiketler
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="seyahat, istanbul, tarihi yerler (virgülle ayırın)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Yayınlanıyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Yayınla</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}