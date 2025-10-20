import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: 'TravelFlow - Seyahat Blog Platformu',
  description: 'Seyahat deneyimlerini keşfet, paylaş ve ilham al. Dünya çapındaki gezginlerle bağlan.',
  keywords: 'seyahat, blog, destinasyon, gezi, macera, keşfet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="bg-gray-50">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
