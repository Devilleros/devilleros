'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <div
        className="relative w-full h-80 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src={imagen}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-20' : 'opacity-100'
            }`}
          />
        </div>

        {/* Overlay - Fondo degradado detrás del texto */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-95' : 'opacity-80'
          }`}
        />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-4 z-10">
          {/* Título - siempre visible */}
          <div
            className={`transition-all duration-300 ${
              isHovered ? 'opacity-0 transform translate-y-4' : 'opacity-100'
            }`}
          >
            <h3 className="text-2xl font-bold text-white drop-shadow-md">
              {titulo}
            </h3>
          </div>

          {/* Descripción - visible solo en hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
              isHovered
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-4'
            }`}
          >
            <p className="text-white text-sm leading-relaxed drop-shadow-md">
              {descripcion}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
