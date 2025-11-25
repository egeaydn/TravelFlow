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
  verification: {
    google: 'c8jabDxPEjdGBl8s1pbP3rWRbIynSZ4qaDlFoOEmxwA',
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
        <meta name="theme-color" content="#4b5563" />
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
