'use client';

import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function ContenidoLayout({children}: Readonly<{children: React.ReactNode}>) {
    const pathname = usePathname();
    const shouldShowNavbar = pathname !== '/Nat';

    return (
        <div>
            {shouldShowNavbar && <Navbar/>}
            {children}
        </div>
);
}