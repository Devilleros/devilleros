"use client";

import { useMemo } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProdTableColumn } from "../../../../types/product-table/types";
import { useProdTableWizard } from "../ProdTableWizardProvider";
import { buildProductTableXlsx, downloadXlsxFile } from "./exportXlsx";

function getColumnLabel(col: ProdTableColumn, idx: number) {
  return col.title.trim().length > 0 ? col.title : `Columna ${idx + 1}`;
}

export function Step3Preview({ onBack }: { onBack: () => void }) {
  const { columns, records } = useProdTableWizard();

  const filename = useMemo(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `tabla-productos_${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}.xlsx`;
  }, []);

  const handleExport = async () => {
    const xlsx = await buildProductTableXlsx(columns, records);
    downloadXlsxFile(filename, xlsx);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border/60 bg-card p-4 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Vista previa</h2>
            <p className="text-sm text-muted-foreground">
              Revisa los datos antes de exportar. Las imágenes en <span className="font-medium">PNG</span>,{" "}
              <span className="font-medium">JPEG</span> o <span className="font-medium">GIF</span> se
              incrustan en el Excel. Otros formatos (p. ej. WebP) se exportan como texto{" "}
              <span className="font-medium text-foreground/90">[imagen]</span>.
            </p>
          </div>
          <Button type="button" className="gap-2 sm:w-auto w-full" onClick={handleExport}>
            <Download className="h-4 w-4" aria-hidden />
            Exportar hoja de cálculo
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                <th className="sticky left-0 z-10 border-r border-border/60 bg-muted/40 px-3 py-2 text-left font-medium text-muted-foreground">
                  #
                </th>
                {columns.map((col, idx) => (
                  <th
                    key={col.id}
                    className="px-3 py-2 text-left font-medium whitespace-nowrap"
                  >
                    {getColumnLabel(col, idx)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-3 py-8 text-center text-muted-foreground"
                  >
                    No hay registros.
                  </td>
                </tr>
              ) : (
                records.map((record, rowIdx) => (
                  <tr
                    key={record.id}
                    className="border-b border-border/40 last:border-b-0 odd:bg-background even:bg-muted/20"
                  >
                    <td className="sticky left-0 z-10 border-r border-border/60 bg-inherit px-3 py-2 text-muted-foreground tabular-nums">
                      {rowIdx + 1}
                    </td>
                    {columns.map((col) => {
                      const raw = record.cells[col.id] ?? "";
                      return (
                        <td key={col.id} className="max-w-[min(280px,40vw)] px-3 py-2 align-top">
                          {col.type === "image" ? (
                            raw ? (
                              <img
                                src={raw}
                                alt=""
                                className="max-h-24 max-w-full rounded-md border border-border/60 object-contain"
                              />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="break-words">
                              {raw.length > 0 ? raw : <span className="text-muted-foreground">—</span>}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
