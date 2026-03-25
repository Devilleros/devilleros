"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { ProdTableColumn, ProdTableRecord } from "../../../../types/product-table/types";
import { useProdTableWizard } from "../ProdTableWizardProvider";

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.readAsDataURL(file);
  });
}

function getColumnLabel(col: ProdTableColumn, idx: number) {
  return col.title.trim().length > 0 ? col.title : `Columna ${idx + 1}`;
}

export function Step2EditRecords({ onBack }: { onBack: () => void }) {
  const { columns, records, activeRecordId, setActiveRecordId, addRecord, updateCell } =
    useProdTableWizard();

  const activeRecord: ProdTableRecord | undefined = useMemo(() => {
    if (!activeRecordId) return records[0];
    return records.find((r) => r.id === activeRecordId) ?? records[0];
  }, [activeRecordId, records]);

  const canAddMore = records.length < 200;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border/60 bg-card p-4 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold">Registros</h2>
            <p className="text-sm text-muted-foreground">
              Editas un registro a la vez. Puedes cambiar entre los registros de la lista.
            </p>
          </div>

          <Button
            type="button"
            onClick={addRecord}
            disabled={!canAddMore}
            className="gap-2"
          >
            <span aria-hidden>+</span>
            Agregar registro
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {records.map((r, idx) => {
            const isActive = r.id === activeRecord?.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRecordId(r.id)}
                className={
                  isActive
                    ? "inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
                    : "inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1 text-sm font-medium text-foreground/90 hover:bg-muted/60 transition-colors"
                }
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-4">
          <h3 className="text-base font-semibold mb-4">
            Editando registro {records.findIndex((r) => r.id === activeRecord?.id) + 1}
          </h3>

        <div className="space-y-4">
          {columns.map((col, idx) => {
            const value = activeRecord?.cells[col.id] ?? "";
            const label = getColumnLabel(col, idx);

            return (
              <div key={col.id} className="space-y-2">
                <label className="block text-sm font-medium text-foreground/90">
                  {label}
                </label>

                {col.type === "text" && (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      updateCell(activeRecord?.id ?? "", col.id, e.target.value)
                    }
                    placeholder=""
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  />
                )}

                {col.type === "number" && (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      updateCell(activeRecord?.id ?? "", col.id, e.target.value)
                    }
                    placeholder=""
                    className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  />
                )}

                {col.type === "image" && (
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const dataUrl = await fileToDataUrl(file);
                        updateCell(activeRecord?.id ?? "", col.id, dataUrl);
                      }}
                      className="block w-full text-sm"
                    />

                    {value ? (
                      <div className="space-y-2">
                        <img
                          src={value}
                          alt={label}
                          className="max-h-48 w-full rounded-lg border border-border/60 object-contain bg-background"
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => updateCell(activeRecord?.id ?? "", col.id, "")}
                          >
                            Quitar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Sube una imagen o toma una foto.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Atrás
        </Button>
      </div>
    </div>
  );
}

