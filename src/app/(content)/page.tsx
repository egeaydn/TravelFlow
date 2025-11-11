import CategoriesCard from '@/components/CategoriesCard'
import Slider from '@/components/Slider'
import ManualSlider from '@/components/ManualSlider'
import CountriesCard from '@/components/CountriesCard'

export default function Page() {
  return (
    <div className='mb-10'>
      <Slider />
      
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-serif mt-12 mb-8">Kategoriler</h1>
        <CategoriesCard />
      </div>
      <ManualSlider />
            
       <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-serif mt-12 mb-8">En Popüler Ülkeler</h1>
        <CountriesCard />
      </div>
    </div>
  )
}
