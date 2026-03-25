"use client";

import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import type { ProdTableColumnType } from "../../../../types/product-table/types";
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
              <div
                key={col.id}
                className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end sm:gap-x-2 sm:gap-y-3"
              >
                <div className="min-w-0">
                  <label className="mb-2 block text-sm font-medium text-foreground/90">
                    Título
                  </label>
                  <input
                    value={col.title}
                    onChange={(e) => setColumnTitle(col.id, e.target.value)}
                    placeholder="Nombre de columna"
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  />
                </div>

                <div className="min-w-0">
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

                <div className="flex flex-col items-end justify-end self-end">
                  <label className="mb-2 hidden min-h-[1.25rem] text-sm font-medium sm:block sm:invisible">
                    &nbsp;
                  </label>
                  <button
                    type="button"
                    disabled={!canRemove}
                    onClick={() => removeColumn(col.id)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background text-destructive transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-40"
                    aria-label={
                      !canRemove
                        ? "No se puede eliminar: debe quedar al menos una columna"
                        : "Eliminar columna"
                    }
                    title={
                      !canRemove
                        ? "Debe quedar al menos una columna"
                        : "Eliminar columna"
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  </button>
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

