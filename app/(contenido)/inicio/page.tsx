"use client"

import { signOut, useSession } from "../../../lib/auth/auth-client";
import CardInicio from "../../components/inicio/CardInicio";

export default function Inicio() {
    const { data: session } = useSession();
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl mb-8">Bienvenido a devilleros.com</h1>
                
                {/* Tarjetas de navegación */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <CardInicio
                        titulo="Modelo 3D"
                        imagen="/modelo3d/POXA1b.jpg"
                        descripcion="Visualización interactiva en 3D de la enzima Lacasa POXA1b. Proyecto de tesis de bioquímica por Natalia Gil. Compatible con Realidad Aumentada (AR) en móviles."
                        href="/Nat"
                    />
                    <CardInicio
                        titulo="Next AI Draw.io"
                        imagen="/drawio/diagramaImage.jpg"
                        descripcion="Aplicación web Next.js que integra capacidades de IA con diagramas de draw.io. Permite crear, modificar y mejorar diagramas mediante comandos de lenguaje natural y visualización asistida por IA."
                        href="/drawio"
                    />
                </div>

                {/* Información de sesión */}
                {session && session.user && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                        <div className="text-xl mb-2">{session.user.name}</div>
                        <div className="text-lg mb-4 text-gray-600">{session.user.email}</div>
                        <button 
                            onClick={signOut}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}