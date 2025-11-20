import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Middleware'den gelen locale'i al
  let locale = await requestLocale;
  
  // Varsayılan olarak 'tr' kullan
  if (!locale) {
    locale = 'tr';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});