import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';

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
    <div className="min-h-screen pt-24 px-4 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('allCountries')}</h1>
          <p className="text-xl text-gray-600">
            {t('pageDescription')}
          </p>
        </div>

        {countries && countries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country) => (

              <Link
                key={country.id}
                href={`/Countries/${country.code}`}
                className="bg-white/300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={country.flag_url}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900 text-center mb-2">
                    {country.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {country.name_en}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('noCountries')}
            </h3>
            <p className="text-gray-600">{t('addFirst')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
