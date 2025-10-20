import { ArrowLeft, MapPin, Calendar, Heart, MessageCircle, Share, User, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  // Mock data - gerçek veriler Supabase'den gelecek
  const post = {
    title: "Paris'te Unutulmaz 5 Gün - Eiffel Kulesi'nden Seine Nehri'ne",
    slug: slug,
    content: `Paris seyahatim hayatımın en güzel deneyimlerinden biriydi. Şehrin büyüleyici atmosferi, tarihi yapıları ve muhteşem mutfağı ile tanışmak inanılmazdı.

**1. Gün - Eiffel Kulesi ve Trocadéro**
Sabah erken saatlerde Eiffel Kulesi'ni ziyaret ettim. Önerím sabah 9:00 civarı gitmek - hem kalabalık az oluyor hem de fotoğraflar çok daha güzel çıkıyor.

**2. Gün - Louvre Müzesi**
Mona Lisa'yı görmek tabii ki heyecan vericiydi ama müzenin diğer bölümlerinde de inanılmaz eserler var. Özellikle Mısır koleksiyonu çok etkileyici.

**3. Gün - Montmartre ve Sacré-Cœur**
Paris'in en romantik bölgesi diyebilirim. Sokak sanatçıları, küçük kafeler ve muhteşem manzara...

**Pratik Öneriler:**
- Metro günlük kartı almayı unutmayın
- Restoranlarda %15 bahşiş normal kabul ediliyor  
- Cumartesi günleri çok kalabalık oluyor, mümkünse hafta içi planlayın`,
    author: {
      name: "Mehmet Özkan",
      avatar: null,
      joinDate: "Haziran 2024"
    },
    location: {
      country: "Fransa",
      city: "Paris"
    },
    publishedAt: "15 Ekim 2024",
    photos: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400", 
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    likes: 47,
    comments: 12,
    isLiked: false
  };

  const comments = [
    {
      id: 1,
      author: "Ayşe Demir",
      content: "Çok güzel bir rehber olmuş! Ben de gelecek ay Paris'e gidiyorum, tavsiyelerine uyacağım.",
      date: "16 Ekim 2024"
    },
    {
      id: 2,
      author: "Can Yılmaz", 
      content: "Montmartre fotoğrafları harika! Hangi saatlerde çektin?",
      date: "16 Ekim 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-25">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        {/* Main Content */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{post.location.city}, {post.location.country}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes} beğeni</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments} yorum</span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author.name}</div>
                  <div className="text-sm text-gray-600">{post.author.joinDate}'ten beri üye</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Beğen</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Paylaş</span>
                </button>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          {post.photos.length > 0 && (
            <div className="relative">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              {post.photos.length > 1 && (
                <>
                  <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {post.photos.map((_, index) => (
                      <div key={index} className="w-2 h-2 bg-white/70 rounded-full"></div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph.startsWith('**') ? (
                    <strong className="text-gray-900">{paragraph.replace(/\*\*/g, '')}</strong>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-xl mt-8 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Yorumlar ({comments.length})
          </h2>

          {/* Comment Form */}
          <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="flex items-center space-x-2 text-orange-800 mb-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Yorum yapmak için giriş yapmanız gerekiyor.</span>
            </div>
            <p className="text-sm text-orange-700">
              Hesabınız yoksa kolayca kayıt olabilirsiniz.
            </p>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Bu blog post sayfası Supabase entegrasyonu ile dinamik içerik gösterecek.
        </div>
      </div>
    </div>
  );
}