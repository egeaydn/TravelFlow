"use client"

import * as React from "react"
import Link from "next/link"
import { 
  MapPin, 
  Compass, 
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
import { useState } from "react"

import { useAuth } from "@/contexts/AuthContext"
import { AuthModal } from "@/components/auth/AuthModal"
import { useIsMobile } from "@/hooks/useIsMobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


const destinations = [
  {
    title: "Avrupa Turları",
    href: "/destinations/europe",
    description: "Paris, Roma, Barcelona ve daha fazlası...",
    icon: <Compass className="w-4 h-4" />
  },
  {
    title: "Asya Maceraları", 
    href: "/destinations/asia",
    description: "Tokyo, Bangkok, Bali gezileri",
    icon: <MapPin className="w-4 h-4" />
  },
  {
    title: "Doğa Rotaları",
    href: "/destinations/nature", 
    description: "Kapadokya, Pamukkale, Antalya",
    icon: <Camera className="w-4 h-4" />
  },
]

const travelCategories = [
  {
    title: "Şehir Turları",
    href: "/categories/city",
    description: "Büyük şehirlerdeki kültürel keşifler"
  },
  {
    title: "Doğa & Macera", 
    href: "/categories/adventure",
    description: "Dağ, orman ve deniz maceraları"
  },
  {
    title: "Gastronomi",
    href: "/categories/food",
    description: "Yerel lezzetler ve mutfak kültürleri"
  },
  {
    title: "Kültür & Sanat",
    href: "/categories/culture", 
    description: "Müzeler, festivaller ve sanat etkinlikleri"
  },
]

export function Navbar() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')
  const { user, signOut, loading } = useAuth()

  return (
    <>
    <nav className="h-22 fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800">
                TravelFlow
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Seyahat Blog Platformu</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center h-full">
            <NavigationMenu className="h-full">
              <NavigationMenuList className="flex items-center space-x-1 h-full">
                
                {/* Ana Sayfa */}
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900 hover:bg-gray-100`} 
                    href="/"
                  >
                    Ana Sayfa
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Destinasyonlar */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    Destinasyonlar
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-100 to-gray-200 p-6 no-underline outline-none focus:shadow-md"
                            href="/destinations"
                          >
                            <MapPin className="h-6 w-6 text-gray-600" />
                            <div className="mb-2 mt-4 text-lg font-medium text-gray-900">
                              Tüm Destinasyonlar
                            </div>
                            <p className="text-sm leading-tight text-gray-600">
                              Dünya çapındaki en güzel gezilecek yerleri keşfedin
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {destinations.map((destination) => (
                        <ListItem
                          key={destination.title}
                          title={destination.title}
                          href={destination.href}
                          icon={destination.icon}
                        >
                          {destination.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Kategoriler */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    Kategoriler
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {travelCategories.map((category) => (
                        <ListItem
                          key={category.title}
                          title={category.title}
                          href={category.href}
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Keşfet */}
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900 hover:bg-gray-100`}
                    href="/explore"
                  >
                    Keşfet
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar - Desktop Only */}
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
                {/* Create Post Button */}
                <Link 
                  href="/create"
                  className="hidden sm:flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Paylaş</span>
                </Link>

                {/* User Profile & Logout */}
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/profile"
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Çıkış Yap"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setAuthModalMode('login')
                    setIsAuthModalOpen(true)
                  }}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Giriş</span>
                </button>
                <button 
                  onClick={() => {
                    setAuthModalMode('signup')
                    setIsAuthModalOpen(true)
                  }}
                  className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Kayıt Ol</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              
              {/* Search Bar - Mobile */}
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
              
              <Link href="/destinations" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                Destinasyonlar  
              </Link>
              
              <Link href="/categories" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                Kategoriler
              </Link>
              
              <Link href="/explore" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                Keşfet
              </Link>

              {user ? (
                <>
                  <Link href="/create" className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-lg font-medium">
                    <PlusCircle className="w-4 h-4 mr-3" />
                    Paylaşım Yap
                  </Link>
                  
                  <Link href="/profile" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <User className="w-4 h-4 mr-3" />
                    Profilim
                  </Link>
                  
                  <button
                    onClick={() => signOut()}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      setAuthModalMode('login')
                      setIsAuthModalOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left"
                  >
                    <LogIn className="w-4 h-4 mr-3" />
                    Giriş Yap
                  </button>
                  
                  <button
                    onClick={() => {
                      setAuthModalMode('signup')
                      setIsAuthModalOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-lg font-medium w-full text-left"
                  >
                    <UserPlus className="w-4 h-4 mr-3" />
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
    
    {/* Auth Modal */}
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      defaultMode={authModalMode}
    />
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
