"use client"

import { signOut, useSession } from "../../../lib/auth/auth-client";

export default function Inicio() {
    const { data: session } = useSession();
    return (
        <div>
            <h1 className="text-4xl mb-4">Bienvenido a devilleros.com</h1>
            <div className="text-2xl mb-4">{session?.user?.name}</div>
            <div className="text-2xl mb-4">{session?.user?.email}</div>
            {session && session.user && (
                <button onClick={signOut}>log out</button>
            )}
        </div>
    )
}