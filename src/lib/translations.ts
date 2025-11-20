/**
 * Supabase'den gelen verileri çevirmek için helper fonksiyonlar
 * Kategoriler, ülkeler gibi veritabanı verilerini çeviri sistemiyle entegre eder
 */

export type LocaleType = 'tr' | 'en';

/**
 * Kategori isimlerini çevir
 */
export const translateCategory = (categoryName: string, locale: LocaleType): string => {
  const translations: Record<string, Record<LocaleType, string>> = {
    'Macera': {
      tr: 'Macera',
      en: 'Adventure'
    },
    'Kültür': {
      tr: 'Kültür',
      en: 'Culture'
    },
    'Gastronomi': {
      tr: 'Gastronomi',
      en: 'Gastronomy'
    },
    'Doğa': {
      tr: 'Doğa',
      en: 'Nature'
    },
    'Tarih': {
      tr: 'Tarih',
      en: 'History'
    },
    'Plaj': {
      tr: 'Plaj',
      en: 'Beach'
    },
    'Şehir': {
      tr: 'Şehir',
      en: 'City'
    }
  };

  return translations[categoryName]?.[locale] || categoryName;
};

/**
 * Supabase'den gelen post açıklamalarını çevir
 */
export const translatePostField = (
  post: any,
  field: 'title' | 'content' | 'description',
  locale: LocaleType
): string => {
  // Eğer post'ta dil bilgisi varsa
  const translationField = `${field}_${locale}`;
  
  if (post[translationField]) {
    return post[translationField];
  }
  
  // Varsayılan olarak orijinal alanı döndür
  return post[field] || '';
};

/**
 * Tarih formatını dile göre ayarla
 */
export const formatDate = (date: string, locale: LocaleType): string => {
  return new Date(date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    day: 'numeric',
    month: locale === 'tr' ? 'long' : 'short',
    year: 'numeric',
  });
};

/**
 * Sayıları dil formatına göre düzenle
 */
export const formatNumber = (num: number, locale: LocaleType): string => {
  return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US').format(num);
};
