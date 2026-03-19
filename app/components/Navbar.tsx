"use client";

import { useAuth } from "@/hooks/userSession";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ArrowLeft,
  Grid2X2,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();

  const avatar = user?.image;
  const initials = [
    user?.name?.trim()?.[0] ?? "",
    user?.lastName?.trim()?.[0] ?? "",
  ]
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo (placeholder) */}
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/" aria-label="Volver a /">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        {/* Center right navigation */}
        <div className="flex-1 flex items-center justify-left">
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="ml-5">
                  <NavigationMenuLink href="/inicio" className={isActive("/inicio") ? "bg-muted/50" : undefined}>
                    <Home className="h-4 w-4" />
                    <span>Inicio</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className={isActive("/drawio") ? "bg-muted/50" : undefined}
                  >
                    <Grid2X2 className="h-4 w-4" />
                    <span>Proximamente</span>
                  </NavigationMenuLink>
                </NavigationMenuItem> */}

                <NavigationMenuItem className="ml-5">
                  <NavigationMenuLink href="/#">
                    <Info className="h-4 w-4" />
                    <span>Info</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="ml-5">
                  <NavigationMenuTrigger>
                    <span className="inline-flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      <span>Herramientas</span>
                    </span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="grid gap-3 p-2 md:w-[520px] md:grid-cols-2">
                      <NavigationMenuLink href="/tools/drawio">
                        <Grid2X2 className="h-4 w-4" />
                        <span className="leading-tight">
                          <span className="block text-sm font-semibold">Diagramas</span>
                          <span className="block text-xs text-muted-foreground">Draw.io + IA</span>
                        </span>
                      </NavigationMenuLink>

                      <NavigationMenuLink href="/tools/univerjs">
                        <Wrench className="h-4 w-4" />
                        <span className="leading-tight">
                          <span className="block text-sm font-semibold">Hoja de cálculo</span>
                          <span className="block text-xs text-muted-foreground">Univer JS</span>
                        </span>
                      </NavigationMenuLink>

                      <NavigationMenuLink href="/tools/Nat">
                        <Wrench className="h-4 w-4" />
                        <span className="leading-tight">
                          <span className="block text-sm font-semibold">Molecula3D</span>
                          <span className="block text-xs text-muted-foreground">Modelo 3D</span>
                        </span>
                      </NavigationMenuLink>

                      <NavigationMenuLink href="/tools/working-time">
                        <Wrench className="h-4 w-4" />
                        <span className="leading-tight">
                          <span className="block text-sm font-semibold">Medir tiempo</span>
                          <span className="block text-xs text-muted-foreground">Working Time</span>
                        </span>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile navigation */}
          <div className="md:hidden">
            <Menubar className="border-none bg-transparent p-0">
              <MenubarMenu>
                <MenubarTrigger className="px-2">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Abrir menú</span>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem asChild>
                    <Link href="/">Inicio</Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link href="/tools/drawio">Diagramas</Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link href="/#">Info</Link>
                  </MenubarItem>

                  <MenubarSub>
                    <MenubarSubTrigger inset>Herramientas</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem asChild>
                        <Link href="/tools/drawio">Diagramas</Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link href="/tools/univerjs">Hoja de cálculo</Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link href="/tools/Nat">Molecula3D</Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link href="/tools/working-time">Medir tiempo</Link>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>

        {/* Right: auth */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted/40 ring-1 ring-border/60"
              aria-label="Cargando"
            />
          ) : isAuthenticated ? (
            <div className="group relative">
              <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full p-0">
                <Link href="/inicio" aria-label="Abrir tu panel" className="block h-full w-full">
                  <Avatar size="lg" className="h-full w-full">
                    <AvatarImage
                      src={avatar ?? undefined}
                      alt={user?.name ?? "Usuario"}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Link>
              </Button>

              {/* Menú hover (se amplía luego con más opciones) */}
              <div
                className="pointer-events-none absolute right-0 top-full w-44 rounded-xl border border-border/60 bg-background/80 backdrop-blur
                           opacity-0 translate-y-1 transition-all duration-200
                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                           group-focus-within:opacity-100 group-focus-within:translate-y-0"
              >
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full justify-start gap-2 rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    logout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          ) : (
            <Button asChild variant="default" size="sm" className="gap-2 rounded-full">
              <Link href="/login" aria-label="Login">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}