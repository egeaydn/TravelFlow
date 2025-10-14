TravelFlow

"Kullanıcıların gezdiği yerleri, deneyimlerini ve fotoğraflarını paylaşabildiği modern bir seyahat blog platformu."

Bu depo, TypeScript ile yazılmış Next.js (App Router) tabanlı bir proje iskeletidir. Aşağıda proje amacı, teknoloji seçimi, klasör yapısı, kurulum ve geliştirme adımları yer alır.

## Proje Amacı

Kullanıcılar kayıt / giriş yaptıktan sonra kendi gezilerini paylaşır. Her paylaşımda başlık, açıklama, konum, tarih ve fotoğraf bulunur. Diğer kullanıcılar gönderilere yorum yapabilir veya beğenebilir. Arayüz çoklu dil desteğine (Türkçe / İngilizce) sahiptir. İçerik yönetimi Sanity CMS (veya tercihe göre Firebase) üzerinden yapılır.

## Öne Çıkan Özellikler

- Kullanıcı kimlik doğrulama (Clerk veya Firebase Auth)
- Gönderi (post) oluşturma / listeleme / silme
- Her gönderi: başlık, açıklama, ülke/şehir, tarih, fotoğraf
- Yorum sistemi (auth zorunlu)
- Beğeniler (kullanıcı başına 1 kez)
- Çoklu dil desteği (Next-Intl ile `en` ve `tr`)
- Sanity CMS ile içerik yönetimi
- TailwindCSS + shadcn/ui ile modern, responsive UI

## Teknoloji Yığını

- Framework: Next.js 15+ (App Router)
- Dil: TypeScript
- UI: TailwindCSS + shadcn/ui
- Auth: Clerk veya Firebase Auth
- CMS / Veri: Sanity (önerilen) veya Firebase Firestore
- Çoklu Dil: next-intl
- API: Next.js Route Handlers (app/api)
- Hosting: Vercel (production)

## Proje Yapısı (önerilen)

travelflow/
 ├─ app/
 │   ├─ page.tsx                  -> Ana sayfa (son paylaşımlar)
 │   ├─ [slug]/page.tsx           -> Tekil blog detayı
 │   ├─ create/page.tsx           -> Yeni paylaşım formu
 │   ├─ profile/page.tsx          -> Kullanıcının gönderileri
 │   └─ api/
 │       ├─ posts/
 │       │   └─ route.ts          -> GET, POST, DELETE işlemleri
 │       └─ comments/
 │           └─ route.ts          -> POST yorum ekleme
 ├─ components/
 │   ├─ Navbar.tsx
 │   ├─ PostCard.tsx
 │   ├─ CommentBox.tsx
 │   ├─ LanguageSwitcher.tsx
 │   └─ Footer.tsx
 ├─ lib/
 │   ├─ sanityClient.ts
 │   ├─ auth.ts
 │   └─ translations/
 ├─ styles/
 │   └─ globals.css
 ├─ sanity/
 │   ├─ schemas/
 │   │   ├─ post.js
 │   │   └─ comment.js
 │   └─ sanity.config.ts
 └─ package.json

> Not: Mevcut çalışma alanınızda halihazırda `app/` ve `src/app/` klasörleri olabilir. Yukarıdaki yapı projenin mantıksal düzenini gösterir.

## Kurulum (lokal geliştirme)

1. Depoyu kopyalayın / klonlayın:

```powershell
git clone <repo-url> travelflow; cd travelflow
```

2. Bağımlılıkları yükleyin:

```powershell
npm install
```

3. Geliştirme sunucusunu başlatın:

```powershell
npm run dev
```

Uygulama varsayılan olarak http://localhost:3000 üzerinde çalışacaktır.

## Örnek .env (çevresel değişkenler)

Projede kullanılacak servisler için aşağıdaki gibi değişkenleri `.env.local` içinde tanımlayın:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_write_token

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

NEXT_PUBLIC_FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...

NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_NEXT_INTL_LOCALES=en,tr
```

Servislerin her biri opsiyoneldir; Clerk veya Firebase tercihine göre gerekli değişkenleri ekleyin. Sanity ile yazma işlemi yapmak için `SANITY_API_TOKEN` gereklidir.

## Sanity - Şema Örnekleri

Sanity kullanacaksanız `sanity/schemas/post.js` ve `sanity/schemas/comment.js` içinde aşağıdaki alanlar olmalıdır (özet):

- post: title, slug, body, publishedAt, location (country, city), photos (image array), author reference
- comment: author reference, post reference, text, createdAt

Bu şemalar Sanity Studio içinde uygun şekilde publish edilebilir.

## API Endpoints (plan)

- `GET /api/posts` - tüm paylaşımları listeler
- `POST /api/posts` - yeni paylaşım oluşturur (auth zorunlu)
- `DELETE /api/posts/:id` - paylaşımı siler (sahip veya admin)
- `POST /api/comments` - bir posta yorum ekler (auth zorunlu)

Bu route'ları `app/api/*/route.ts` şeklinde Next.js 15 Route Handlers ile uygulayın ve `lib/sanityClient.ts` üzerinden Sanity'ye bağlayın.

## Çoklu Dil (i18n)

`next-intl` kullanarak `locales/en.json` ve `locales/tr.json` dosyaları oluşturun. Dil anahtarlarını sayfalarda ve bileşenlerde kullanın. `components/LanguageSwitcher.tsx` ile kullanıcıya dil seçeneği sunun.

## UI ve Stil

TailwindCSS ve shadcn/ui bileşen kütüphanesi ile minimal, responsive ve erişilebilir bir tasarım hedefleyin. Global stiller `styles/globals.css` içinde toplanır.

## Geliştirme Yol Haritası (kısa)

1. Proje kurulumu ve temel Next.js yapılandırması
2. UI bileşenleri: `Navbar`, `PostCard`, `CommentBox`, `LanguageSwitcher`, `Footer`
3. Auth (Clerk veya Firebase) entegre etme
4. Sanity projelerini ve şemalarını oluşturma
5. `lib/sanityClient.ts` ve API route'larını yazma
6. Çoklu dil (next-intl) uygulama
7. Test, build ve Vercel deploy

## Deploy (Vercel)

1. Vercel hesabı oluşturun ve repo'yu bağlayın.
2. Vercel dashboard'da gerekli çevresel değişkenleri (`SANITY_*`, `CLERK_*`, `NEXT_PUBLIC_SITE_URL`, vb.) ekleyin.
3. Branch'ı seçip `Deploy` yapın veya CLI ile `vercel --prod` komutunu kullanın.

## Katkıda Bulunma

1. Yeni bir branch oluşturun: `git checkout -b feature/your-feature`
2. Değişiklikleri commit edin ve push'layın
3. Pull request açın

## Lisans

Bu proje varsayılan olarak MIT lisansı ile dağıtılabilir. (İsterseniz `LICENSE` ekleyebilirim.)

---

Hazırladığım bu README, proje planınızı doğrudan yansıtır ve geliştiriciler için bir başlangıç rehberidir. Bir sonraki adımda isterseniz `app/` iskelet sayfalarını ve temel bileşenleri ekleyebilirim.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
