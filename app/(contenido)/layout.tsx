'use client';

import Navbar from "../components/Navbar";

export default function ContenidoLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
);
}