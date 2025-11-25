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
    <>
      <div className='mb-10'>
        <Slider />
      
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-serif mt-12 mb-8">{t('categories')}</h1>
        <CategoriesCard />
      </div>

      <div className='mx-auto'>
      <ManualSlider />
      </div>
            
      <div className="max-w-7xl mx-auto px-4 mb-8">
          <h1 className="text-4xl font-serif mt-12 mb-8">{t('popularCountries')}</h1>
          <CountriesCard />
      </div>

       <div className="max-w-7xl mx-auto px-4 mb-8">
          <h1 className="text-4xl font-serif mt-12 mb-8">{t('userComments')}</h1>
          <UserComments />
      </div>

      </div>
    </>
  )
}
