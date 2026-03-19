'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { Card } from '@/components/ui/card';

interface CardInicioProps {
  titulo: string;
  imagen: string;
  descripcion: string;
  href: string;
  alt?: string;
}

export default function CardInicio({
  titulo,
  imagen,
  descripcion,
  href,
  alt = titulo,
}: CardInicioProps) {
  return (
    <Link href={href} className="block">
      <Card className="group relative h-80 overflow-hidden rounded-xl border-border/60 bg-card/50 p-0 py-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative h-full w-full">
          <Image
            src={imagen}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            priority={false}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-95" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-white/10 via-white/0 to-white/10" />

          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                {titulo}
              </h3>

              <ChevronRight className="h-4 w-4 shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>

            <p className="mt-2 max-w-[95%] text-sm leading-relaxed text-white/90 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {descripcion}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
