import { MapPin, Calendar, Heart, MessageCircle, TrendingUp, Camera, Compass, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Mock data - gerçek veriler Supabase'den gelecek
  const featuredPosts = [
    {
      id: 1,
      title: "Paris'te Unutulmaz 5 Gün - Eiffel Kulesi'nden Seine Nehri'ne",
      slug: "paris-unutulmaz-5-gun",
      excerpt: "Paris seyahatimin detaylarını paylaşıyorum. Şehrin en güzel köşelerini, yerel lezzetleri ve pratik tavsiyelerimi bulabilirsiniz...",
      author: "Mehmet Özkan",
      location: { country: "Fransa", city: "Paris" },
      publishedAt: "2 gün önce",
      likes: 47,
      comments: 12,
      thumbnail: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Kapadokya Balon Turu: Gün Doğumunda Büyülü Anlar",
      slug: "kapadokya-balon-turu",
      excerpt: "Kapadokya'da yaşadığım unutulmaz balon turu deneyimi. Gün doğumunda vadiler üzerinde uçmak...",
      author: "Ayşe Demir",
      location: { country: "Türkiye", city: "Kapadokya" },
      publishedAt: "1 hafta önce",
      likes: 83,
      comments: 24,
      thumbnail: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Bali Adası: Cennet Köşesinde 10 Gün",
      slug: "bali-cennet-kosesi",
      excerpt: "Bali'nin mistik atmosferi, pirinç tarlaları, Hindu tapınakları ve muhteşem plajları...",
      author: "Can Yılmaz",
      location: { country: "Endonezya", city: "Bali" },
      publishedAt: "2 hafta önce",
      likes: 126,
      comments: 31,
      thumbnail: "/api/placeholder/400/250"
    }
  ];

  const popularDestinations = [
    { name: "Paris", country: "Fransa", posts: 12 },
    { name: "İstanbul", country: "Türkiye", posts: 24 },
    { name: "Tokyo", country: "Japonya", posts: 8 },
    { name: "Roma", country: "İtalya", posts: 15 },
    { name: "Barcelona", country: "İspanya", posts: 18 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-25">
      
      
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Compass className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Seyahat Deneyimlerini <br />
              <span className="text-gray-300">Keşfet & Paylaş</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Dünya çapındaki gezginlerin deneyimlerinden ilham al, 
              kendi maceralarını paylaş ve unutulmaz anıları keşfet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/explore"
                className="inline-flex items-center space-x-2 bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>Destinasyonları Keşfet</span>
              </Link>
              <Link 
                href="/create"
                className="inline-flex items-center space-x-2 border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                <Camera className="w-5 h-5" />
                <span>Deneyimini Paylaş</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Öne Çıkan Seyahatler
              </h2>
              <p className="text-gray-600">
                En popüler ve ilham verici seyahat deneyimleri
              </p>
            </div>
            <Link 
              href="/explore"
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors"
            >
              <span>Tümünü Gör</span>
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{post.location.city}, {post.location.country}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>
                  
                  <Link href={`/${post.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-gray-700 transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {post.author}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Popüler Destinasyonlar
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-4">
                {popularDestinations.map((destination, index) => (
                  <Link 
                    key={index}
                    href={`/destinations?location=${destination.name}`}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <MapPin className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-600">{destination.country}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {destination.posts} paylaşım
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Platform İstatistikleri
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">127</div>
                  <div className="text-sm text-gray-600">Toplam Paylaşım</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">43</div>
                  <div className="text-sm text-gray-600">Ziyaret Edilen Ülke</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">89</div>
                  <div className="text-sm text-gray-600">Aktif Gezgin</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1.2k</div>
                  <div className="text-sm text-gray-600">Toplam Beğeni</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 text-white rounded-2xl p-6 mt-6">
              <div className="text-center">
                <Camera className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">
                  Sen de Katıl!
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Seyahat deneyimlerini paylaş, diğer gezginlerle tanış.
                </p>
                <Link 
                  href="/create"
                  className="block bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  İlk Paylaşımını Yap
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          Bu sayfadaki tüm içerikler demo amaçlıdır. Gerçek veriler Supabase entegrasyonu ile gelecek.
        </div>
      </div>
    </div>
  );
}
