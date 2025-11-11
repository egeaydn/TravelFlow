import CategoriesCard from '@/components/CategoriesCard'
import Slider from '@/components/Slider'

export default function Page() {
  return (
    <div className='mb-10'>
      <Slider />
      
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mt-12 mb-8">Kategoriler</h1>
        <CategoriesCard />
      </div>

    </div>
  )
}
