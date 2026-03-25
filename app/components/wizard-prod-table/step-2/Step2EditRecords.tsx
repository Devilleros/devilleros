"use client";

import { useMemo, useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui-drawio/dialog";
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

function ImagePickButton({
  label,
  value,
  onDataUrl,
  onClear,
}: {
  label: string;
  value: string;
  onDataUrl: (dataUrl: string) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const dataUrl = await fileToDataUrl(file);
          onDataUrl(dataUrl);
          e.target.value = "";
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={value ? "outline" : "default"}
          className="gap-2"
          onClick={() => inputRef.current?.click()}
          aria-label={value ? `Cambiar imagen: ${label}` : `Agregar imagen: ${label}`}
        >
          <ImagePlus className="h-4 w-4" aria-hidden />
          {value ? "Cambiar imagen" : "Elegir imagen o tomar foto"}
        </Button>
        {value ? (
          <Button type="button" variant="ghost" onClick={onClear}>
            Quitar
          </Button>
        ) : null}
      </div>

      {value ? (
        <img
          src={value}
          alt={label}
          className="max-h-48 w-full rounded-lg border border-border/60 object-contain bg-background"
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Sube una imagen desde archivos o usa la cámara en el móvil.
        </p>
      )}
    </div>
  );
}

export function Step2EditRecords({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const {
    columns,
    records,
    activeRecordId,
    setActiveRecordId,
    addRecord,
    removeRecord,
    updateCell,
  } = useProdTableWizard();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const activeRecord: ProdTableRecord | undefined = useMemo(() => {
    if (!activeRecordId) return records[0];
    return records.find((r) => r.id === activeRecordId) ?? records[0];
  }, [activeRecordId, records]);

  const canAddMore = records.length < 200;
  const canDeleteRecord = records.length > 1;

  const handleConfirmDelete = () => {
    if (!activeRecord?.id) return;
    removeRecord(activeRecord.id);
    setDeleteDialogOpen(false);
  };

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
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold">
            Editando registro {records.findIndex((r) => r.id === activeRecord?.id) + 1}
          </h3>
          <Button
            type="button"
            variant="destructive"
            className="gap-2 sm:w-auto w-full"
            disabled={!canDeleteRecord}
            onClick={() => setDeleteDialogOpen(true)}
            title={
              !canDeleteRecord
                ? "Debe quedar al menos un registro"
                : "Borrar este registro"
            }
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Borrar registro
          </Button>
        </div>

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
                  <ImagePickButton
                    label={label}
                    value={value}
                    onDataUrl={(dataUrl) =>
                      updateCell(activeRecord?.id ?? "", col.id, dataUrl)
                    }
                    onClear={() => updateCell(activeRecord?.id ?? "", col.id, "")}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:items-center">
        <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto">
          Atrás
        </Button>
        <Button type="button" onClick={onNext} className="w-full sm:w-auto">
          Siguiente
        </Button>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¿Borrar este registro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminarán los datos de este registro
              en esta sesión (no hay persistencia en el servidor).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
              Borrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

