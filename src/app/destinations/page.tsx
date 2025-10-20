import { MapPin, Calendar, Users } from "lucide-react";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-600 rounded-full">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Destinasyonlar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dünya çapındaki en güzel gezilecek yerleri keşfedin ve diğer gezginlerin deneyimlerinden ilham alın.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Yakında Geliyor!
            </h2>
            <p className="text-gray-600 mb-6">
              Destinasyonlar sayfamızda dünya çapındaki en popüler gezilecek yerler, 
              kullanıcı deneyimleri ve fotoğraflarla birlikte listelenecek.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Lokasyon Bazlı</h3>
              <p className="text-sm text-gray-600">Ülke ve şehir kategorileri</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Kullanıcı Deneyimleri</h3>
              <p className="text-sm text-gray-600">Gerçek gezgin hikayeleri</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Mevsimsel Öneriler</h3>
              <p className="text-sm text-gray-600">En uygun ziyaret zamanları</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Bu sayfa Supabase entegrasyonu tamamlandığında aktif hale gelecek.
          </div>
        </div>
      </div>
    </div>
  );
}