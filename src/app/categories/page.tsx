import { Camera, Mountain, Utensils, Palette } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    {
      title: "Şehir Turları",
      description: "Büyük şehirlerdeki kültürel keşifler, mimari harikalar ve şehir yaşamı",
      icon: <Camera className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Doğa & Macera", 
      description: "Dağ, orman ve deniz maceraları, doğa yürüyüşleri ve ekstrem sporlar",
      icon: <Mountain className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Gastronomi",
      description: "Yerel lezzetler, mutfak kültürleri ve yemek deneyimleri",
      icon: <Utensils className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Kültür & Sanat",
      description: "Müzeler, festivaller, sanat etkinlikleri ve tarihi yerler",
      icon: <Palette className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-600 rounded-full">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kategoriler
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            İlgi alanınıza göre seyahat deneyimlerini keşfedin ve kendi tarzınıza uygun içerikleri bulun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`h-32 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                <div className="text-white">
                  {category.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    Yakında Aktif
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Kategori Bazlı İçerik Yakında!
          </h2>
          <p className="text-gray-600 mb-6">
            Her kategori için özel filtreleme, arama ve sıralama özellikleri ile 
            istediğiniz türde seyahat içeriklerini kolayca bulabileceksiniz.
          </p>
          <div className="text-sm text-gray-500">
            Bu özellikler Supabase entegrasyonu ile birlikte aktif hale gelecek.
          </div>
        </div>
      </div>
    </div>
  );
}