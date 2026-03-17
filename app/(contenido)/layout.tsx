'use client';

import Navbar from "../components/Navbar";
import { AuthProvider } from "@/contexts/auth-context";

export default function ContenidoLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <AuthProvider>
                <Navbar/>
                {children}
            </AuthProvider>
        </div>
);
}