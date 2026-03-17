"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/userSession";

export default function Navbar() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <Link href="/" className="flex items-center space-x-2">
                <div className="text-lg font-bold">Devilleros.com</div>
            </Link>
            <ul className="flex space-x-4">
                <li>
                    <Link href="/inicio" className="hover:text-gray-300">
                        inicio
                    </Link>
                </li>
                <li>
                    {isLoading ? (
                        <span className="text-gray-400">Cargando…</span>
                    ) : isAuthenticated ? (
                        <>
                            {user?.name && (
                                <span className="mr-2 text-gray-300">{user.name}</span>
                            )}
                            <button
                                type="button"
                                onClick={() => logout()}
                                className="hover:text-gray-300"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="hover:text-gray-300">
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}