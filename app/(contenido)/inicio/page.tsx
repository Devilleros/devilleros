"use client"

import { useMemo } from "react";
import { useAuth } from "@/hooks/userSession";
import CardInicio from "../../components/inicio/CardInicio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Inicio() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                    {/* Tools */}
                    <section className="space-y-4">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                                Herramientas
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold">
                                Explora tus aplicaciones
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Diagrams, hoja de cálculo, molécula 3D y medir tiempo de trabajo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <CardInicio
                                titulo="Modelo 3D"
                                imagen="/modelo3d/POXA1b.jpg"
                                descripcion="Visualización interactiva en 3D de la enzima Lacasa POXA1b. Proyecto de tesis de bioquímica por Natalia Gil. Compatible con Realidad Aumentada (AR) en móviles."
                                href="/tools/Nat"
                            />
                            <CardInicio
                                titulo="Next AI Draw.io"
                                imagen="/drawio/diagramaImage.jpg"
                                descripcion="Aplicación web Next.js que integra capacidades de IA con diagramas de draw.io. Permite crear, modificar y mejorar diagramas mediante comandos de lenguaje natural y visualización asistida por IA."
                                href="/tools/drawio"
                            />
                            <CardInicio
                                titulo="Univer JS"
                                imagen="/univer_js/univer_js.jpg"
                                descripcion="Aplicación web de hoja de cálculo potente y moderna basada en Univer JS. Permite crear, editar y gestionar libros de trabajo completos con funcionalidades avanzadas de cálculo, formato y visualización de datos en tiempo real."
                                href="/tools/univerjs"
                            />
                            <CardInicio
                                titulo="Working Time"
                                imagen="/working-time/09567c98-d2c2-43e7-a042-d8a64bedc808.png"
                                descripcion="Sistema completo de registro de jornada laboral con base de datos, backend y frontend. Permite a los trabajadores iniciar y terminar su jornada con un código único, visualizar el tiempo laborado en tiempo real mediante un cronómetro, y registrar automáticamente hora de entrada, hora de salida y tiempo total laborado."
                                href="/tools/working-time"
                            />
                        </div>
                    </section>

                    {/* Account (minimal) */}
                    {isLoading ? (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Cargando...</p>
                        </div>
                    ) : (
                    <aside className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cuenta</CardTitle>
                                <CardDescription>
                                    {user ? "Sesión activa" : "Inicia sesión para continuar"}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage
                                                    src={user.image ?? undefined}
                                                    alt={user.name ?? "Usuario"}
                                                />
                                                <AvatarFallback>{user.name?.trim()?.[0] ?? ""}{user.lastName?.trim()?.[0] ?? ""}</AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold">
                                                    {user.name ?? "Usuario"}
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            className="w-full gap-2"
                                            onClick={() => logout()}
                                        >
                                            Cerrar sesión
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground">
                                            Necesitas una cuenta para acceder a tus herramientas.
                                        </p>
                                        <Button asChild className="w-full">
                                            <Link href="/login">Ir a login</Link>
                                        </Button>
                                    </div>
                                )}
                                </CardContent>
                            </Card>
                        </aside>
                    )}
                </div>
            </main>
        </div>
    )
}