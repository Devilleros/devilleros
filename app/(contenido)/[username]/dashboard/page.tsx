"use client"

import { signOut } from "@/lib/auth/auth-client";

export default function Dashboard() {    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <h1 className="text-4xl mb-4">Bienvenido a devilleros.com</h1>
            <button onClick={signOut}>
                cerrar sesion
            </button>
        </div>
    )
}