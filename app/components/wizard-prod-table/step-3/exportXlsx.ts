import * as XLSX from "xlsx";
import type { ProdTableColumn, ProdTableRecord } from "../../../../types/product-table/types";

function getColumnLabel(col: ProdTableColumn, idx: number) {
  return col.title.trim().length > 0 ? col.title : `Columna ${idx + 1}`;
}

/** Las imágenes en data URL no se incrustan; se exporta marcador de texto. */
function cellForExport(col: ProdTableColumn, raw: string): string {
  if (col.type === "image") {
    return raw.trim().length > 0 ? "[imagen]" : "";
  }
  return raw;
}

export function buildProductTableXlsx(
  columns: ProdTableColumn[],
  records: ProdTableRecord[]
): Uint8Array {
  const header = columns.map((col, idx) => getColumnLabel(col, idx));
  const rows = records.map((record) =>
    columns.map((col) => {
      const raw = record.cells[col.id] ?? "";
      return cellForExport(col, raw);
    })
  );
  const aoa: string[][] = [header, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Productos");
  return XLSX.write(wb, { bookType: "xlsx", type: "array" }) as Uint8Array;
}

export function downloadXlsxFile(filename: string, data: Uint8Array) {
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
