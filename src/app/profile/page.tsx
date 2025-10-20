import { User, MapPin, Calendar, Heart, MessageCircle, Settings, Camera, Edit } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-gray-400 to-gray-600"></div>
          <div className="px-8 py-6">
            <div className="flex items-start space-x-6">
              <div className="relative -mt-16">
                <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-600" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Adı</h1>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Düzenle</span>
                  </button>
                </div>
                <p className="text-gray-600 mb-4">
                  Seyahat tutkunu, fotoğraf meraklısı. Dünyayı keşfetmeyi ve deneyimlerimi paylaşmayı seviyorum.
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>İstanbul, Türkiye</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Haziran 2024'ten beri üye</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Toplam Gönderi</span>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Toplam Beğeni</span>
                  <span className="font-semibold text-gray-900">284</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Toplam Yorum</span>
                  <span className="font-semibold text-gray-900">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ziyaret Edilen Ülke</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Edit className="w-5 h-5 text-gray-600" />
                  <span>Profil Bilgilerini Düzenle</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>Hesap Ayarları</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <span>Fotoğraf Galerim</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Paylaşımlarım</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  Tümü
                </button>
                <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Yayınlanan
                </button>
                <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  Taslaklar
                </button>
              </div>
            </div>

            {[1, 2, 3].map((post) => (
              <div key={post} className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Paris'te Unutulmaz 5 Gün - Eiffel Kulesi'nden Seine Nehri'ne
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      Paris seyahatimin detaylarını paylaşıyorum. Şehrin en güzel köşelerini, 
                      yerel lezzetleri ve pratik tavsiyelerimi bulabilirsiniz...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>Paris, Fransa</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>15 Ekim 2024</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>24</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>8</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Henüz Paylaşım Yok
              </h3>
              <p className="text-gray-600 mb-6">
                İlk seyahat deneyimini paylaş ve topluluğa katıl!
              </p>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors">
                İlk Paylaşımını Yap
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Bu profil sayfası Supabase auth ve user management sistemi ile aktif hale gelecek.
        </div>
      </div>
    </div>
  );
}