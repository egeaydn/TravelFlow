import CategoriesCard from '@/components/CategoriesCard'
import Slider from '@/components/Slider'
import ManualSlider from '@/components/ManualSlider'
import CountriesCard from '@/components/CountriesCard'
import UserComments from '@/components/UserComments'
import Script from 'next/script'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('home')


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Slider Section */}
      <section className="w-full">
        <Slider />
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {t('categories')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full"></div>
          </div>
          <CategoriesCard />
        </div>
      </section>

      {/* Manual Slider Section */}
      <section className="w-full my-12">
        <ManualSlider />
      </section>

      {/* Popular Countries Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {t('popularCountries')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full"></div>
          </div>
          <CountriesCard />
        </div>
      </section>

      {/* User Comments Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              {t('userComments')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full"></div>
          </div>
          <UserComments />
        </div>
      </section>
    </div>
  )
}
