"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

const Navbar = dynamic(() => import("@/components/Navbar").then(mod => ({ default: mod.Navbar })), {
    ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer").then(mod => ({ default: mod.Footer })), {
    ssr: false,
    loading: () => <div className="h-96"></div>
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <BreadcrumbNav />
            {children}
            <Footer />
        </>
    );
}