import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // Desteklenen diller
  locales: ['tr', 'en'],
  
  // Varsayılan dil
  defaultLocale: 'tr',
  
  // URL'den locale prefix'ini gizle (varsayılan dil için)
  localePrefix: 'as-needed'
});
 
// Navigation helpers
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
