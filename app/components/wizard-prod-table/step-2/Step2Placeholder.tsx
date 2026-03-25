"use client";

import { Button } from "@/components/ui/button";

export function Step2Placeholder({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 space-y-4">
      <h2 className="text-lg font-semibold">Paso 2 (próximamente)</h2>
      <p className="text-sm text-muted-foreground">
        Por ahora solo configuramos columnas (título + tipo). En el siguiente paso
        agregaremos la configuración/visualización relacionada.
      </p>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Atrás
        </Button>
      </div>
    </div>
  );
}

