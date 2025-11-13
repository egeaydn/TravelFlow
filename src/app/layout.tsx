import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://travelflow.live'),
  title: {
    default: 'TravelFlow - Seyahat Blog Platformu',
    template: '%s | TravelFlow'
  },
  description: 'Keşfet. Dünyanın en güzel yerlerini keşfet • Seyahat Et. Yeni maceralar ve deneyimler • Paylaş. Hikayelerini dünya ile paylaş • İlham Al. Diğer gezginlerden ilham ...',
  keywords: ['seyahat', 'blog', 'destinasyon', 'gezi', 'macera', 'keşfet', 'seyahat rehberi', 'yeni maceralar', 'deneyimler', 'paylaş', 'hikayeler', 'gezginler', 'ilham'],
  authors: [{ name: 'TravelFlow' }],
  creator: 'TravelFlow',
  publisher: 'TravelFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://travelflow.live',
    title: 'TravelFlow - Seyahat Blog Platformu',
    description: 'Keşfet. Dünyanın en güzel yerlerini keşfet • Seyahat Et. Yeni maceralar ve deneyimler • Paylaş. Hikayelerini dünya ile paylaş • İlham Al. Diğer gezginlerden ilham ...',
    siteName: 'TravelFlow',
    images: [
      {
        url: 'https://travelflow.live/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TravelFlow - Seyahat Blog Platformu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TravelFlow - Seyahat Blog Platformu',
    description: 'Keşfet. Dünyanın en güzel yerlerini keşfet • Seyahat Et. Yeni maceralar ve deneyimler • Paylaş. Hikayelerini dünya ile paylaş',
    images: ['https://travelflow.live/og-image.jpg'],
    creator: '@travelflow',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="canonical" href="https://travelflow.live" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-gray-50">
        <AuthProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
