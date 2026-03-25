"use client";

import { useMemo } from "react";
import type { ProdTableColumnType } from "../types";
import { useProdTableWizard } from "../ProdTableWizardProvider";
import { Button } from "@/components/ui/button";

export function Step1EditColumns({ onNext }: { onNext: () => void }) {
  const { columns, setColumnTitle, setColumnType, addColumn, removeColumn } = useProdTableWizard();

  const typeOptions = useMemo(
    () =>
      [
        { value: "text" as const, label: "texto" },
        { value: "image" as const, label: "imagen" },
        { value: "number" as const, label: "numero" },
      ] as { value: ProdTableColumnType; label: string }[],
    []
  );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border/60 bg-card p-4">
        <div className="grid gap-3">
          {columns.map((col) => {
            const canRemove = columns.length > 1;
            return (
              <div key={col.id} className="grid grid-cols-12 items-end gap-3">
                <div className="col-span-7">
                  <label className="mb-2 block text-sm font-medium text-foreground/90">
                    Título
                  </label>
                  <div className="flex items-end gap-2">
                    <input
                      value={col.title}
                      onChange={(e) => setColumnTitle(col.id, e.target.value)}
                      placeholder="Nombre de columna"
                      className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      disabled={!canRemove}
                      onClick={() => removeColumn(col.id)}
                      aria-label="Eliminar columna"
                      title={!canRemove ? "Se requiere al menos 1 columna" : "Eliminar columna"}
                    >
                      <span aria-hidden className="text-base leading-none">
                        -
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="col-span-5">
                  <label className="mb-2 block text-sm font-medium text-foreground/90">
                    Tipo
                  </label>
                  <select
                    value={col.type}
                    onChange={(e) => setColumnType(col.id, e.target.value as ProdTableColumnType)}
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {typeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => addColumn("text")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background hover:bg-muted/60 transition-colors"
            aria-label="Agregar columna"
            title="Agregar columna"
          >
            <span className="text-xl leading-none">+</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}

