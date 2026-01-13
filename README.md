# 🌍 TravelFlow

> Modern seyahat deneyimlerini paylaşma ve keşfetme platformu

[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8)](https://tailwindcss.com/)

**TravelFlow**, kullanıcıların seyahat deneyimlerini paylaşabildiği, keşfedebildiği ve etkileşime girebildiği modern bir blog platformudur. Gezginler gezdikleri yerleri, hikayelerini ve fotoğraflarını dünya ile paylaşabilir.

🌐 **Canlı Demo:** [travelflow.com](https://www.travelflow.live/) _(domain adresinizi buraya ekleyin)_

## ✨ Özellikler

### 🔐 Kullanıcı Yönetimi
- **Güvenli Kimlik Doğrulama**: Supabase Auth ile email/password
- **Otomatik Profil Oluşturma**: Kayıt sırasında trigger ile UserProfile
- **Profil Yönetimi**: Kullanıcı bilgileri, avatar, bio
- **Kişisel Dashboard**: Kendi paylaşımlarınızı ve yorumlarınızı görüntüleme

### 📝 İçerik Yönetimi
- **Zengin Post Editörü**: Başlık, içerik, özet, etiketler
- **Görsel Yönetimi**: Featured image yükleme
- **Kategori Sistemi**: Seyahat, Kültür, Yemek, Macera, Rehber
- **Lokasyon Seçimi**: Ülke ve şehir bazlı filtreleme
- **Slug Sistemi**: SEO-friendly URL'ler (Türkçe karakter desteği)

### 💬 Sosyal Özellikler
- **Yorum Sistemi**: Post'lara yorum yapma
- **Beğeni Sistemi**: Post'ları beğenme (kullanıcı başına 1 kez)
- **Profil Görüntüleme**: Kullanıcıların paylaşımlarını inceleme
- **Real-time İstatistikler**: Beğeni sayıları anlık güncelleme

### 🗺️ Keşif
- **Ülke Sayfaları**: Ülke bazlı gezi deneyimleri
- **Kategori Filtreleme**: İlgi alanlarına göre içerik bulma
- **Breadcrumb Navigasyon**: Kolay sayfa geçişleri
- **Arama**: Post, ülke ve şehir araması _(geliştirme aşamasında)_

### 🎨 Kullanıcı Deneyimi
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Modern UI**: TailwindCSS + shadcn/ui bileşenleri
- **Smooth Animations**: Framer Motion ile profesyonel animasyonlar
  - Stagger animations (sıralı element girişleri)
  - Hover transformations (scale, translateY)
  - Page transitions
  - Micro-interactions
- **Dark Mode Ready**: Karanlık mod desteği _(yakında)_

## 🛠️ Teknoloji Yığını

### Frontend
- **Framework**: [Next.js 15.5.5](https://nextjs.org/) (App Router + Turbopack)
- **Dil**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Smooth page transitions & micro-interactions
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API

### Backend & Database
- **BaaS**: [Supabase](https://supabase.com/)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage _(yapılandırma aşamasında)_
- **Real-time**: Supabase Realtime subscriptions

### Özellikler
- **RLS Policies**: Row Level Security ile veri güvenliği
- **Database Triggers**: Otomatik profil oluşturma
- **Foreign Keys**: İlişkisel veri bütünlüğü
- **Indexes**: Performans optimizasyonu

## 📁 Proje Yapısı

```
travelflow/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (content)/           # Content layout grubu
│   │   │   ├── [category]/      # Dinamik kategori sayfaları
│   │   │   ├── Countries/       # Ülke sayfaları
│   │   │   │   └── [code]/      # Dinamik ülke detay
│   │   │   ├── createPost/      # Post oluşturma
│   │   │   ├── UserProfiles/    # Kullanıcı profili
│   │   │   └── layout.tsx       # Content layout
│   │   ├── post/
│   │   │   └── [slug]/          # Dinamik post detay
│   │   ├── login/               # Giriş sayfası
│   │   ├── register/            # Kayıt sayfası
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Ana sayfa
│   ├── components/              # Reusable components
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer
│   │   ├── BreadcrumbNav.tsx    # Breadcrumb navigation
│   │   ├── CountryCard.tsx      # Ülke kartı (Framer Motion)
│   │   ├── PostCard.tsx         # Post kartı (Framer Motion)
│   │   ├── LikeButton.tsx       # Beğeni butonu
│   │   └── CommentPartiaView.tsx # Yorum sistemi
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   ├── utils/                   # Utility functions
│   │   └── supabase/
│   │       ├── client.ts        # Client-side Supabase
│   │       └── server.ts        # Server-side Supabase
│   └── hooks/                   # Custom hooks
│       └── useIsMobile.tsx      # Mobile detection
├── public/                      # Static files
│   └── favicon.svg             # Site icon
├── sql/                        # Database scripts
│   ├── fix_likes_table.sql
│   ├── create_comments_table.sql
│   └── debug_userprofiles.sql
└── package.json

```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm, yarn, pnpm veya bun
- Supabase hesabı

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/egeaydn/TravelFlow.git
cd travelflow
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Çevre Değişkenlerini Ayarlayın

`.env.local` dosyası oluşturun:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Veritabanını Yapılandırın

Supabase Dashboard'da SQL Editor'ı kullanarak `sql/` klasöründeki scriptleri çalıştırın:

1. `create_comments_table.sql` - Yorumlar tablosu
2. `fix_likes_table.sql` - Beğeniler tablosu
3. UserProfiles trigger'ını ayarlayın (Supabase docs)

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📊 Veritabanı Şeması

### Ana Tablolar

- **UserProfiles**: Kullanıcı profil bilgileri
- **Posts**: Blog gönderileri
- **Categories**: Post kategorileri
- **Countries**: Ülke bilgileri
- **Cities**: Şehir bilgileri
- **Comments**: Post yorumları
- **Likes**: Post beğenileri

### İlişkiler

```
UserProfiles (1) ─→ (N) Posts
Posts (1) ─→ (N) Comments
Posts (1) ─→ (N) Likes
UserProfiles (1) ─→ (N) Comments
UserProfiles (1) ─→ (N) Likes
Countries (1) ─→ (N) Posts
Categories (1) ─→ (N) Posts
```

## 🔒 Güvenlik

- **Row Level Security (RLS)**: Tüm tablolarda aktif
- **Authentication Required**: Hassas işlemler için zorunlu
- **Input Validation**: Client ve server-side doğrulama
- **SQL Injection Prevention**: Parametreli sorgular
- **XSS Protection**: Next.js built-in koruması

## 🌐 Deployment

### Vercel (Önerilen)

1. GitHub repo'nuzu Vercel'e bağlayın
2. Environment variables'ı ekleyin
3. Deploy butonuna basın

```bash
# Veya CLI ile
npm install -g vercel
vercel --prod
```

### Diğer Platformlar

Next.js, çeşitli platformlarda deploy edilebilir:
- Netlify
- AWS Amplify
- Railway
- Render

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Geliştirici

**Ege Aydın**
- GitHub: [@egeaydn](https://github.com/egeaydn)
- Email: [iletisim@travelflow.com](mailto:iletisim@travelflow.com)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide](https://lucide.dev/) - Beautiful icons

---

⭐ Bu projeyi beğendiyseniz, yıldız vermeyi unutmayın!
