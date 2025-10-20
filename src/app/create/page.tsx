import { PlusCircle, Camera, MapPin, Calendar, Type, Image, Lock } from "lucide-react";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-25">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-600 rounded-full">
              <PlusCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seyahat Deneyimini Paylaş
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gittiğin yerleri, yaşadığın anıları ve çektiğin fotoğrafları diğer gezginlerle paylaş.
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center space-x-3 text-orange-800">
            <Lock className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Giriş Gerekli</h3>
              <p className="text-sm text-orange-700">
                Blog yazısı paylaşabilmek için giriş yapmanız gerekiyor.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Yeni Paylaşım Oluştur
            </h2>
            
            <div className="space-y-6">
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4" />
                  <span>Başlık</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Seyahat deneyiminin başlığını yazın..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none bg-gray-50"
                  disabled
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Ülke</span>
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none bg-gray-50" disabled>
                    <option>Ülke seçin...</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Şehir</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Şehir adını yazın..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none bg-gray-50"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Ziyaret Tarihi</span>
                </label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4" />
                  <span>Deneyimin</span>
                </label>
                <textarea 
                  rows={8}
                  placeholder="Seyahat deneyimini detaylı olarak anlat... Neler gördün? Neler yaşadın? Önerilerín neler?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none bg-gray-50 resize-none"
                  disabled
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4" />
                  <span>Fotoğraflar</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Fotoğraflarını buraya sürükle veya tıkla</p>
                  <p className="text-sm text-gray-500">PNG, JPG, WEBP (Max. 5MB her biri)</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-medium cursor-not-allowed">
                  Taslak Olarak Kaydet
                </button>
                <button className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-medium cursor-not-allowed">
                  Yayınla
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Camera className="w-5 h-5 text-gray-600" />
              <span>Fotoğraf Yönetimi</span>
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Çoklu fotoğraf yükleme</li>
              <li>• Otomatik boyutlandırma</li>
              <li>• Sıralama ve düzenleme</li>
              <li>• Supabase Storage entegrasyonu</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Type className="w-5 h-5 text-gray-600" />
              <span>İçerik Editörü</span>
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Markdown desteği</li>
              <li>• Otomatik kaydetme</li>
              <li>• Taslak ve yayın modu</li>
              <li>• SEO optimizasyonu</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Bu form Supabase auth ve database entegrasyonu tamamlandığında aktif hale gelecek.
        </div>
      </div>
    </div>
  );
}