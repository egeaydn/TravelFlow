import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // API, static files ve Next.js internal routes hariç tüm route'ları eşleştir
  matcher: [
    // Tüm route'ları eşleştir
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Root ve locale'li path'ler
    '/',
    '/(tr|en)/:path*'
  ]
};
