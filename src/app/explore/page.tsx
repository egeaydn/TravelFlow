import { Search, Filter, Globe, TrendingUp } from "lucide-react";

export default function ExplorePage() {
  const searchSuggestions = [
    "Istanbul", "Paris", "Tokyo", "Kapadokya", "Santorini", 
    "Bali", "Roma", "Barcelona", "Amsterdam", "Prag"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-600 rounded-full">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Keşfet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Destinasyonları, şehirleri ve seyahat deneyimlerini arayarak hayal ettiğiniz gezileri planlayın.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Destinasyon, şehir, ülke veya deneyim ara..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none bg-gray-50"
                disabled
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Ara
              </button>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filtreler</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Globe className="w-4 h-4" />
                <span>Tüm Ülkeler</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <TrendingUp className="w-4 h-4" />
                <span>Popüler</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Popüler Aramalar
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Akıllı Arama</h3>
            <p className="text-sm text-gray-600">
              Konum, kategori ve anahtar kelime bazlı gelişmiş arama
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Filtreleme</h3>
            <p className="text-sm text-gray-600">
              Tarih, bütçe, aktivite türü ve daha fazlasına göre filtrele
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Trend Analizi</h3>
            <p className="text-sm text-gray-600">
              En popüler destinasyonlar ve yükselen trendler
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Güçlü Arama Motoru Yakında!
          </h2>
          <p className="text-gray-600 mb-4">
            Binlerce seyahat deneyimi arasından istediğinizi kolayca bulabileceğiniz 
            gelişmiş arama ve filtreleme sistemi geliştiriliyor.
          </p>
          <div className="text-sm text-gray-500">
            Bu özellik Supabase veritabanı ve full-text search ile aktif hale gelecek.
          </div>
        </div>
      </div>
    </div>
  );
}