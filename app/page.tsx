"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Fondo Spline */}
      <iframe
        src="https://my.spline.design/cutecomputerfollowcursor-kJ8TfYXwSqxGVpBJP792mfNn/"
        className="absolute inset-0 w-full h-full z-0"
        frameBorder={0}
        title="Fondo Spline"
        loading="lazy"
      />

      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      {/* Barras suaves (arriba y abajo) */}
      <div className="absolute top-0 left-0 right-0 z-20 h-16 bg-black backdrop-blur-sm" />
      <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-black backdrop-blur-sm" />

      {/* Contenido encima */}
      <div className="relative z-30 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl text-center drop-shadow-[0_14px_40px_rgba(0,0,0,0.75)]">
          <p className="text-sm uppercase tracking-widest text-white/70">
            devilleros.com
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight text-white">
            Bienvenido 
            {/* <span className="block text-white/75 font-semibold">Devilleros</span> */}
          </h1>

          <p className="mt-3 text-white/80">
            Explora herramientas y recursos en una portada moderna y lista para empezar.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="p-5 group relative overflow-hidden rounded-full border-white/30 bg-white/10 text-white shadow-lg shadow-black/30
                         ring-1 ring-white/30 transition-all duration-300
                         hover:bg-white/80 hover:shadow-black/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Link href="/inicio" aria-label="Ir a inicio" className="relative flex items-center gap-3">
                <span className="relative z-10 inline-flex items-center gap-3">
                  <span className="text-base sm:text-lg font-semibold">Ir al inicio</span>

                  <span
                    aria-hidden
                    className="relative z-10 inline-flex size-9 items-center justify-center rounded-full 
                               transition-all duration-300 group-hover:translate-x-2"
                  >
                    <ArrowRight
                      size={18}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </span>

                {/* Glint suave */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full
                             bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0
                             transition-all duration-700 group-hover:translate-x-[160%] group-hover:opacity-100"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
