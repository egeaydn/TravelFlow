import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function CountriesPage() {
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
          <h1 className="text-2xl font-bold text-red-600 mb-4">Hata!</h1>
          <p className="text-gray-600">Ülkeler yüklenirken bir hata oluştu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tüm Ülkeler</h1>
          <p className="text-xl text-gray-600">
            Seyahat ettiğimiz ülkeleri keşfedin ve deneyimleri okuyun
          </p>
        </div>

        {countries && countries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country) => (

              <Link
                key={country.id}
                href={`/Countries/${country.code}`}
                className="bg-white-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <img
                  src={country.flag_url }
                  alt={country.name}
                  width={300}
                  height={100}
                  className="object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl">{country.flag}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {country.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Henüz ülke eklenmemiş
            </h3>
            <p className="text-gray-600">İlk ülkeyi sen ekle!</p>
          </div>
        )}
      </div>
    </div>
  );
}
