import Link from "next/link";
import { ExternalLink } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { InicioProject } from "@/lib/inicio-content/inicio-content";

type CardProyectoInicioProps = {
  project: InicioProject;
};

export default function CardProyectoInicio({ project }: CardProyectoInicioProps) {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card/50 p-0 transition-shadow hover:shadow-lg">
      <Link
        href={project.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          <iframe
            title={`Vista previa de ${project.title}`}
            src={project.previewUrl}
            scrolling="no"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[105%] w-[105%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 opacity-95 transition-opacity duration-300 group-hover:opacity-45"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0"
            aria-hidden
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Abrir sitio
          </span>
        </div>

        <CardHeader className="relative z-10 pb-2 transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0">
          <CardTitle className="text-xl transition-colors group-hover:text-primary">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {project.description}
          </CardDescription>
          <p className="truncate pt-2 text-xs text-muted-foreground">
            {project.externalUrl}
          </p>
        </CardHeader>

        <div className="absolute inset-0 z-20 flex min-h-0 flex-col justify-end p-4 text-white sm:p-5">
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.94)_45%,rgba(0,0,0,0.78)_78%,rgba(0,0,0,0.2)_92%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-80"
            aria-hidden
          />
          <div className="pointer-events-none relative z-10 max-h-[min(24rem,75vh)] w-full translate-y-2 overflow-y-auto opacity-0 transition-[opacity,transform] duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <h3 className="mb-2 text-base font-semibold leading-snug text-white">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/95 text-pretty">
              {project.hoverDetail}
            </p>
            <p className="mt-3 border-t border-white/20 pt-3 font-mono text-xs text-white/75">
              {project.stack}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
