"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from './../../components/Navbar';
import { BreadcrumbNav } from './../../components/BreadcrumbNav';

const Footer = dynamic(() => import("./../../components/Footer").then(mod => ({ default: mod.Footer })), {
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