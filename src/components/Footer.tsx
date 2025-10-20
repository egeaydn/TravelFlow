"use client"

import Link from "next/link";

type Education = {
    title: string;
    href: string
}

type Campus = {
    title: string;
    address: string;
}

type Links = {
    title: string;
    href: string
}

export function Footer() {

    const phone = "0212 555 0123";
    const email = "info@travelflow.com";
    const year = new Date().getFullYear();

    const travelCategories: Education[] = [
        {
            title: "Şehir Turları",
            href: "/categories/city",
        },
        {
            title: "Doğa & Macera",
            href: "/categories/adventure"
        },
        {
            title: "Gastronomi",
            href: "/categories/food",
        },
        {
            title: "Kültür & Sanat",
            href: "/categories/culture",
        },
        {
            title: "Avrupa Turları",
            href: "/destinations/europe",
        },
        {
            title: "Asya Maceraları",
            href: "/destinations/asia",
        },
        {
            title: "Doğa Rotaları",
            href: "/destinations/nature",
        }
    ]

    const travelInfo: Campus[] = [
        {
            title: "İletişim",
            address: "Seyahat deneyimlerinizi paylaşın ve keşfedin",
        },
        {
            title: "Topluluk",
            address: "Binlerce gezginle bağlantı kurun ve ilham alın",
        }
    ]

    const quickLinks: Links[] = [
        {
            title: "Ana Sayfa",
            href: "/",
        },
        {
            title: "Destinasyonlar",
            href: "/destinations",
        },
        {
            title: "Kategoriler",
            href: "/categories"
        },
        {
            title: "Keşfet",
            href: "/explore"
        },
        {
            title: "Paylaş",
            href: "/create"
        },
        {
            title: "Profil",
            href: "/profile"
        }
    ]

    return (
        <div className="relative m-0 bg-gray-900  to-primary/10 p-6 sm:p-8">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center gap-4 pb-10">
                    <p className="text-white/90 font-sans text-xl sm:text-2xl m-0 tracking-wide">Bizimle Bağlantıda Kalın:</p>
                    <div className="flex flex-wrap gap-3">
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-pink-500/10 hover:ring-pink-400/40">
                            <svg width="22" height="22" fill="currentColor" className="" viewBox="0 0 24 24">
                                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" />
                            </svg>
                        </a>
                        {/* X (formerly Twitter) */}
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 hover:ring-white/40">
                            <svg width="22" height="22" fill="currentColor" className="" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-blue-500/10 hover:ring-blue-400/40">
                            <svg width="22" height="22" fill="currentColor" className="" viewBox="0 0 24 24">
                                <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05h-2.1V12h2.1v-1.6c0-2.07 1.23-3.22 3.12-3.22c.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.3l-.37 2.9h-1.93v7.05A10 10 0 0 0 22 12z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="border-y border-slate-500/10 py-6 mb-6">
                    <div className="py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="border-l pl-5 border-white/10">
                            <h2 className="text-white/90 uppercase tracking-wider text-sm mb-3">
                                Keşfet
                            </h2>
                            <ul className="space-y-2">
                                {travelCategories.map((category: Education, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-100 transition-colors">
                                        <Link href={category.href} >{category.title}</Link>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div className="pl-5 pb-2 border-l border-slate-500/10 h-fit">
                            <h2 className="text-white/90 uppercase tracking-wider text-sm mb-3">
                                TravelFlow
                            </h2>
                            <ul className="space-y-2">
                                {travelInfo.map((info: Campus, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-100 transition-colors max-w-sm">
                                        <p className="text-gray-400"><span className="text-gray-300 font-medium">{info.title}:</span> {info.address}</p>
                                    </li>
                                ))}
                                <li className="text-gray-300">
                                    📞 {phone}
                                </li>
                                <li className="text-gray-300">
                                    ✉️ {email}
                                </li>

                            </ul>
                        </div>
                        <div className="pl-5 pb-2 border-l border-slate-500/10 h-fit">
                            <h2 className="text-white/90 uppercase tracking-wider text-sm mb-3 ">
                                Hızlı Menü
                            </h2>
                            <ul className="space-y-2">
                                {quickLinks.map((links: Links, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-100 transition-colors">
                                        <Link href={links.href} >{links.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="h-fit items-center justify-center flex mt-10 ">
                            {/* <Logo fontSize={160} /> */}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-gray-400 font-sans text-xs sm:text-sm tracking-wide m-0">© {year} TravelFlow. Tüm hakları saklıdır.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-gray-400 hover:text-gray-100 text-xs sm:text-sm">Gizlilik</Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-100 text-xs sm:text-sm">KVKK</Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-100 text-xs sm:text-sm">Kullanım Koşulları</Link>
                        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-gray-200 hover:bg-white/10 text-xs">
                            Yukarı Çık
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}