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

export function BreadcrumbNav() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    if (isHome) return null;

    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    const getBreadcrumbLabel = (segment: string) => {
        const decoded = decodeURIComponent(segment);
        
        const labelMap: { [key: string]: string } = {
            'createPost': 'Gönderi Oluştur',
            'UserProfiles': 'Profilim',
            'Countries': 'Ülkeler',
            'post': 'Gönderi',
            'login': 'Giriş Yap',
            'register': 'Kayıt Ol'
        };

        return labelMap[segment] || decoded.replace(/-/g, ' ');
    };

    return (
        <div className="container mx-auto px-4 py-6 pt-24">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Ana Sayfa</Link>
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
