"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  MapPin, 
  Camera, 
  Heart, 
  User, 
  Search,
  Menu,
  X,
  Globe,
  PlusCircle,
  LogIn,
  UserPlus,
  LogOut
} from "lucide-react"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState, useEffect } from "react"

import { useAuth } from "@/contexts/AuthContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { createClient } from "@/utils/supabase/client"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


// Statik destinasyonlar dinamik ülkeler ile değiştirildi

export function Navbar() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [topCountries, setTopCountries] = useState<any[]>([])
  const [mostPopularCountry, setMostPopularCountry] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const { user, signOut, loading } = useAuth()

  const supabase = createClient()

  useEffect(() => {
    fetchCategories()
    fetchTopCountries()
    if (user) {
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('UserProfiles')
        .select('avatar_url, full_name')
        .eq('user_id', user?.id)
        .single()

      if (error) {
        console.error('Profile fetch error:', error)
      } else if (data) {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('Categories')
        .select('*')
        .limit(4) // İlk 4 kategori

      if (error) {
        console.error('Categories fetch error:', error)
      } else if (data) {
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchTopCountries = async () => {
    try {
      // En çok post atılan ülkeleri getir
      const { data, error } = await supabase
        .from('Posts')
        .select(`
          country_id,
          Countries!inner(
            id,
            name,
            code,
            flag
          )
        `)
        .not('country_id', 'is', null)

      if (error) {
        console.error('Countries fetch error:', error)
        // Post verisi yoksa, doğrudan Countries tablosundan çek
        await fetchAllCountries()
        return
      }

      if (data && data.length > 0) {
        // Ülkeleri post sayısına göre grupla
        const countryPostCounts = data.reduce((acc, post) => {
          const countryId = post.country_id
          const country = post.Countries
          
          if (!acc[countryId]) {
            acc[countryId] = {
              ...country,
              post_count: 0
            }
          }
          acc[countryId].post_count++
          return acc
        }, {} as any)

        // En çok post atılan 4 ülkeyi al
        const sortedCountries = Object.values(countryPostCounts)
          .sort((a: any, b: any) => b.post_count - a.post_count)
          .slice(0, 4)

        setTopCountries(sortedCountries)
        setMostPopularCountry(sortedCountries[0] || null)
      } else {
        // Post verisi yoksa, doğrudan Countries tablosundan çek
        await fetchAllCountries()
      }
    } catch (error) {
      console.error('Error fetching top countries:', error)
      // Hata durumunda da Countries tablosundan çek
      await fetchAllCountries()
    }
  }

  const fetchAllCountries = async () => {
    try {
      const { data: countriesData, error: countriesError } = await supabase
        .from('Countries')
        .select('id, name, code, flag')
        .limit(4)

      if (countriesError) {
        console.error('All countries fetch error:', countriesError)
        return
      }

      if (countriesData) {
        // Post sayısı olmadığı için varsayılan değer ver
        const countriesWithCount = countriesData.map(country => ({
          ...country,
          post_count: 0
        }))

        setTopCountries(countriesWithCount)
        setMostPopularCountry(countriesWithCount[0] || null)
      }
    } catch (error) {
      console.error('Error fetching all countries:', error)
    }
  }

  return (
    <>
    <nav className="h-22 sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                <Image src="/compassicon.png" alt="TravelFlow" width={40} height={40} className="object-cover" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">
                TravelFlow
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Seyahat Blog Platformu</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center h-full">
            <NavigationMenu className="h-full">
              <NavigationMenuList className="flex items-center space-x-1 h-full">
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900 hover:bg-gray-100`} 
                    href="/"
                  >
                    Ana Sayfa
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push('/Countries')}
                  >
                    Ülkeler
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {mostPopularCountry && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-100 to-blue-200 p-6 no-underline outline-none focus:shadow-md"
                              href={`/Countries/${mostPopularCountry.code}`}
                            >
                              <Globe className="h-6 w-6 text-blue-600" />
                              <div className="mb-2 mt-4 text-lg font-medium text-gray-900 flex items-center gap-2">
                                {mostPopularCountry.name}
                              </div>
                              <p className="text-sm leading-tight text-gray-600">
                                {mostPopularCountry.post_count > 0 
                                  ? `En popüler destinasyon • ${mostPopularCountry.post_count} paylaşım`
                                  : 'Popüler destinasyon • Keşfetmeye başla!'
                                }
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      )}
                      {topCountries.slice(1).map((country) => (
                        <ListItem
                          key={country.id}
                          title={`${country.name}`}
                          href={`/Countries/${country.code}`}
                          icon={<MapPin className="w-4 h-4" />}
                        >
                          {country.post_count > 0 ? `${country.post_count} paylaşım` : 'Keşfetmeye başla!'}
                        </ListItem>
                      ))}
                      {topCountries.length === 0 && (
                        <div className="col-span-2 text-center text-gray-500 py-4">
                          Ülkeler yükleniyor...
                        </div>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    Kategoriler
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {categories.map((category) => (
                        <ListItem
                          key={category.id}
                          title={category.name}
                          href={`/${category.slug}`}
                        >
                          {category.description || 'Kategori açıklaması'}
                        </ListItem>
                      ))}
                      {categories.length === 0 && (
                        <div className="col-span-2 text-center text-gray-500 py-4">
                          Kategoriler yükleniyor...
                        </div>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {user && (
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className={`${navigationMenuTriggerStyle()} text-gray-700 mb-4`}
                      href="/createPost"
                    >
                      <PlusCircle className="w-4 h-4 mr-2 text-center" />
                      Post Paylaş
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center space-x-3 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Destinasyon, şehir veya ülke ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none text-sm bg-white/70"
              />
            </div>
          </div>

          {/* Auth & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Language Switcher */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Globe className="w-5 h-5" />
            </button>

            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/UserProfiles"
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {userProfile?.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt={userProfile.full_name || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </Link>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Çıkış Yap"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Çıkış yapmak istediğinize emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Çıkış yaptıktan sonra tekrar giriş yapmanız gerekecek.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => signOut()}>Çıkış Yap</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link 
                  href="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Giriş</span>
                </Link>
                <Link 
                  href="/register"
                  className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Kayıt Ol</span>
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              
              <div className="relative mb-3 px-2">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none text-sm"
                />
              </div>

              <Link href="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                Ana Sayfa
              </Link>

              <Link href="/Countries" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                Ülkeler
              </Link>
              
              <Link href="/categories" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                Kategoriler
              </Link>

              {user ? (
                <>
                  <Link href="/createPost" className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-lg font-medium">
                    <PlusCircle className="w-4 h-4 mr-3" />
                    Post Paylaş
                  </Link>
                  
                  <Link href="/profile" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <User className="w-4 h-4 mr-3" />
                    Profilim
                  </Link>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Çıkış Yap
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Çıkış yapmak istediğinize emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Çıkış yaptıktan sonra tekrar giriş yapmanız gerekecek.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => signOut()}>Çıkış Yap</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <Link 
                    href="/login"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4 mr-3" />
                    Giriş Yap
                  </Link>
                  
                  <Link
                    href="/register"
                    className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-lg font-medium w-full text-left"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="w-4 h-4 mr-3" />
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  </>
  )
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { 
  href: string; 
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link 
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 group"
        >
          <div className="flex items-center space-x-2">
            {icon && <span className="text-gray-500 group-hover:text-gray-700">{icon}</span>}
            <div className="text-sm font-medium leading-none text-gray-900 group-hover:text-gray-700">
              {title}
            </div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
