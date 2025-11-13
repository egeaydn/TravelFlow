import CategoriesCard from '@/components/CategoriesCard'
import Slider from '@/components/Slider'
import ManualSlider from '@/components/ManualSlider'
import CountriesCard from '@/components/CountriesCard'
import UserComments from '@/components/UserComments'
import Script from 'next/script'

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TravelFlow',
    description: 'Seyahat Blog Platformu - Keşfet, Paylaş, İlham Al',
    url: 'https://travelflow.live',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://travelflow.live/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TravelFlow',
      logo: {
        '@type': 'ImageObject',
        url: 'https://travelflow.live/logo-512.svg',
      },
    },
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='mb-10'>
        <Slider />
      
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-serif mt-12 mb-8">Kategoriler</h1>
        <CategoriesCard />
      </div>

      <div className='mx-auto'>
      <ManualSlider />
      </div>
            
      <div className="max-w-7xl mx-auto px-4 mb-8">
          <h1 className="text-4xl font-serif mt-12 mb-8">En Popüler Ülkeler</h1>
          <CountriesCard />
      </div>

       <div className="max-w-7xl mx-auto px-4 mb-8">
          <h1 className="text-4xl font-serif mt-12 mb-8">Kullanıcı Yorumlarımız</h1>
          <UserComments />
      </div>

      </div>
    </>
  )
}
