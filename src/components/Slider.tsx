'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useTranslations } from 'next-intl'

export default function Slider() {
  const t = useTranslations('slider')
  
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop",
      title: t('discover.title'),
      description: t('discover.description')
    },
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop",
      title: t('travel.title'),
      description: t('travel.description')
    },
    {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=600&fit=crop",
      title: t('share.title'),
      description: t('share.description')
    },
    {
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&h=600&fit=crop",
      title: t('inspire.title'),
      description: t('inspire.description')
    },
    {
      url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=600&fit=crop",
      title: t('remember.title'),
      description: t('remember.description')
    }
  ]

  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselImages.map((item, index) => (
              <CarouselItem key={index}>
                <div className="overflow-hidden rounded-xl">
                  <div className="relative w-full h-[500px] md:h-[600px]">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-end pb-16 text-white">
                      <h2 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h2>
                      <p className="text-lg md:text-xl text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </div>
  )
}