import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import type { InicioTool } from "@/lib/inicio-content/inicio-content";

type SidebarHerramientasProps = {
  tools: InicioTool[];
};

export default function SidebarHerramientas({ tools }: SidebarHerramientasProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Herramientas
        </p>
        <h2 className="mt-1 text-lg font-semibold">Accesos rápidos</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Se abren en una nueva pestaña.
        </p>
      </div>

      <nav aria-label="Herramientas" className="space-y-1">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/60"
          >
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={tool.image}
                alt={tool.imageAlt ?? tool.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </span>
            <span className="min-w-0 flex-1 text-sm font-medium leading-tight">
              {tool.title}
            </span>
            <ExternalLink
              className="h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}
