"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Compass,
  Camera,
  Utensils,
  Mountain,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
  continent: string;
  flag_url: string;
  post_count?: number;
  name_en: string;
}

export default function CountriesCard() {
  const t = useTranslations("countries");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      // Önce tüm postları çek
      const { data: posts, error: postsError } = await supabase
        .from("Posts")
        .select("country_id")
        .not("country_id", "is", null);

      if (postsError) {
        console.error("Posts fetch error:", postsError);
        return;
      }

      const countryPostCounts: { [key: number]: number } = {};
      posts?.forEach((post) => {
        if (post.country_id) {
          countryPostCounts[post.country_id] =
            (countryPostCounts[post.country_id] || 0) + 1;
        }
      });

      const { data, error } = await supabase.from("Countries").select("*");

      if (error) {
        console.error("Countries fetch error:", error);
      } else if (data) {
        // Post sayılarını ekle
        const countriesWithCounts = data.map((country) => ({
          ...country,
          post_count: countryPostCounts[country.id] || 0,
        }));

        // Post sayısına göre sırala ve ilk 4'ünü al
        const topCountries = countriesWithCounts
          .sort((a, b) => b.post_count - a.post_count)
          .slice(0, 4);

        setCountries(topCountries);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  if (countries.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <Card className="text-center py-12">
          <CardContent>
            <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">{t("noCountries")}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {countries.map((country) => (
        <Link
          key={country.id}
          href={`/Countries/${country.code}`}
          className="group bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-200 hover:border-gray-400"
        >
          <div className="h-48 w-full overflow-hidden relative">
            <img
              src={country.flag_url}
              alt={country.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {(country.post_count ?? 0) > 0 && (
              <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                {country.post_count} {t('posts')}
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-1 group-hover:text-gray-700 transition-colors">
              {country.name}
            </h3>
            <p className="text-gray-500 text-center text-sm font-medium">
              {country.name_en}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
