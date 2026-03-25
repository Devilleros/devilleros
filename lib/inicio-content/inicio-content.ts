export type InicioProject = {
  id: string;
  title: string;
  /** URL embebida en el iframe (vista previa decorativa) */
  previewUrl: string;
  /** Enlace público (abre en nueva pestaña) */
  externalUrl: string;
  /** Resumen breve bajo el título (siempre visible) */
  description: string;
  /** Detalle al pasar el cursor: qué hace el producto y qué partes tiene */
  hoverDetail: string;
  /** Stack y herramientas (línea corta, ej. en overlay) */
  stack: string;
};

export type InicioTool = {
  id: string;
  title: string;
  href: string;
  image: string;
  imageAlt?: string;
};

export const INICIO_PROJECTS: InicioProject[] = [
  {
    id: "iluminova",
    title: "Iluminova L&A",
    previewUrl: "https://www.iluminova.co",
    externalUrl: "https://www.iluminova.co",
    description:
      "Web corporativa y panel interno para una empresa de instalaciones eléctricas, iluminación y soluciones de automatización.",
    hoverDetail:
      "La parte pública presenta servicios, proyectos realizados e imagen de marca. El área privada concentra inventario, generación y seguimiento de cotizaciones, visión de ventas y apuntes contables. Hay gestión de usuarios con roles y permisos, y trazabilidad auditable de los cambios en inventario y cotizaciones para reducir errores y responsabilizar acciones.",
    stack: "Next.js · TypeScript · Tailwind CSS · Prisma · PostgreSQL",
  },
];

export const INICIO_TOOLS: InicioTool[] = [
  {
    id: "drawio",
    title: "Diagramas",
    href: "/tools/drawio",
    image: "/drawio/diagramaImage.jpg",
    imageAlt: "Diagrama de ejemplo",
  },
  {
    id: "univerjs",
    title: "Hoja de cálculo",
    href: "/tools/univerjs",
    image: "/univer_js/univer_js.jpg",
    imageAlt: "Hoja de cálculo Univer JS",
  },
  {
    id: "product-table",
    title: "Tabla de productos",
    href: "/tools/product-table",
    image: "/product-table/product-table.jpg",
    imageAlt: "Tabla de productos",
  },
  {
    id: "working-time",
    title: "Medir tiempo",
    href: "/tools/working-time",
    image: "/working-time/09567c98-d2c2-43e7-a042-d8a64bedc808.png",
    imageAlt: "Working Time",
  },
  {
    id: "nat",
    title: "Molecula 3D",
    href: "/tools/Nat",
    image: "/modelo3d/POXA1b.jpg",
    imageAlt: "Vista del modelo 3D Lacasa POXA1b",
  },
];
