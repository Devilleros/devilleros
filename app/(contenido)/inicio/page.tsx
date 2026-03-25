"use client";

import { useAuth } from "@/hooks/userSession";
import CardProyectoInicio from "../../components/inicio/CardProyectoInicio";
import SidebarHerramientas from "../../components/inicio/SidebarHerramientas";
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
import { INICIO_PROJECTS, INICIO_TOOLS } from "@/lib/inicio-content/inicio-content";

export default function Inicio() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <section className="space-y-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Proyectos
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Sitios y trabajos destacados
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Vista previa en la tarjeta; el enlace abre el sitio en una nueva
                pestaña.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {INICIO_PROJECTS.map((project) => (
                <CardProyectoInicio key={project.id} project={project} />
              ))}
            </div>
          </section>

          {isLoading ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Cargando...</p>
            </div>
          ) : (
            <aside className="space-y-6">
              

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
                          <AvatarFallback>
                            {user.name?.trim()?.[0] ?? ""}
                            {user.lastName?.trim()?.[0] ?? ""}
                          </AvatarFallback>
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

              <div className="hidden lg:block">
                <SidebarHerramientas tools={INICIO_TOOLS} />
              </div>
              
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
