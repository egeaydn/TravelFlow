"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export function BreadcrumbNav() {
    const t = useTranslations('breadcrumb');
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '/en';

    // Ülke detay sayfalarında breadcrumb'ı gizle (Countries/[code])
    const isCountryDetail = /^\/[a-z]{2}\/Countries\/[A-Z]{2,3}$/.test(pathname) || /^\/Countries\/[A-Z]{2,3}$/.test(pathname);

    if (isHome || isCountryDetail) return null;

    // /en gibi locale prefix'lerini breadcrumb'dan çıkar
    const pathSegments = pathname.split('/').filter(segment => segment !== '' && segment !== 'en' && segment !== 'tr');

    const getBreadcrumbLabel = (segment: string) => {
        const decoded = decodeURIComponent(segment);
        
        const labelMap: { [key: string]: string } = {
            'createPost': t('createPost'),
            'UserProfiles': t('profile'),
            'Countries': t('countries'),
            'post': t('post'),
            'login': t('login'),
            'register': t('register')
        };

        return labelMap[segment] || decoded.replace(/-/g, ' ');
    };

    return (
        <div className="container mx-auto px-4 py-6 pt-24">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">{t('home')}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {pathSegments.map((segment, index) => {
                        const href = '/' + pathSegments.slice(0, index + 1).join('/');
                        const isLast = index === pathSegments.length - 1;
                        const label = getBreadcrumbLabel(segment);
                        
                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="text-gray-500 capitalize">
                                            {label}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild className="capitalize hover:text-blue-600">
                                            <Link href={href}>
                                                {label}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
