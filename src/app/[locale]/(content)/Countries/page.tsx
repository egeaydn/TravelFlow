import { createClient } from "@/utils/supabase/server";
import { getTranslations } from 'next-intl/server';
import CountryCard from '@/components/CountryCard';
import { Globe, Sparkles } from 'lucide-react';

export default async function CountriesPage() {
  const t = await getTranslations('countries');
  const supabase = await createClient();

  // Tüm ülkeleri çek ve her ülkede kaç post olduğunu say
  const { data: countries, error: countriesError } = await supabase
    .from("Countries")
    .select(
      `
      *,
      Posts(count)
    `
    )
    .order("name", { ascending: true });

  if (countriesError) {
    console.error("Error fetching countries:", countriesError);
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{t('error')}</h1>
          <p className="text-gray-600">{t('loadError')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-6 shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('allCountries')}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('pageDescription')}
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">
              {countries?.length || 0} ülke keşfedilmeyi bekliyor
            </span>
          </div>
        </div>

        {/* Countries Grid */}
        {countries && countries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <CountryCard 
                key={country.id} 
                country={country} 
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Globe className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t('noCountries')}
            </h3>
            <p className="text-gray-600 text-lg">{t('addFirst')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
