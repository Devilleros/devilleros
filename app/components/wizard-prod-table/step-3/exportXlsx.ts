import ExcelJS from "exceljs";
import type { ProdTableColumn, ProdTableRecord } from "../../../../types/product-table/types";

function getColumnLabel(col: ProdTableColumn, idx: number) {
  return col.title.trim().length > 0 ? col.title : `Columna ${idx + 1}`;
}

function cellForExportText(col: ProdTableColumn, raw: string): string {
  if (col.type === "image") {
    return "";
  }
  return raw;
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1];
  if (!base64) return new Uint8Array();
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Excel (via exceljs) solo admite PNG, JPEG o GIF incrustados. */
function getEmbeddableImageFormat(
  dataUrl: string
): { extension: "png" | "jpeg" | "gif"; buffer: Uint8Array } | null {
  const m = dataUrl.match(/^data:image\/(png|jpeg|jpg|gif);base64,/i);
  if (!m) return null;
  const t = m[1].toLowerCase();
  const extension = t === "jpg" || t === "jpeg" ? "jpeg" : (t as "png" | "gif");
  return { extension, buffer: dataUrlToUint8Array(dataUrl) };
}

const IMAGE_DISPLAY_W = 120;
const IMAGE_DISPLAY_H = 90;
const ROW_HEIGHT_PTS = 90 * 0.75;

export async function buildProductTableXlsx(
  columns: ProdTableColumn[],
  records: ProdTableRecord[]
): Promise<Uint8Array> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Productos");

  worksheet.addRow(columns.map((col, idx) => getColumnLabel(col, idx)));
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };

  records.forEach((record) => {
    const values = columns.map((col) => {
      const raw = record.cells[col.id] ?? "";
      if (col.type === "image") {
        const trimmed = raw.trim();
        if (!trimmed) return "";
        if (!trimmed.startsWith("data:image")) return "[imagen]";
        const img = getEmbeddableImageFormat(trimmed);
        if (!img) return "[imagen]";
        return "";
      }
      return cellForExportText(col, raw);
    });
    worksheet.addRow(values);
  });

  records.forEach((record, recordIdx) => {
    const rowNumber = recordIdx + 2;
    let hasEmbeddedImage = false;
    columns.forEach((col) => {
      if (col.type !== "image") return;
      const raw = record.cells[col.id] ?? "";
      if (!raw.trim().startsWith("data:image")) return;
      const img = getEmbeddableImageFormat(raw);
      if (img) hasEmbeddedImage = true;
    });
    if (hasEmbeddedImage) {
      worksheet.getRow(rowNumber).height = ROW_HEIGHT_PTS;
    }
  });

  // Anchors: fila 0 = cabecera; primera fila de datos = 1 (índices nativos de ExcelJS).
  records.forEach((record, recordIdx) => {
    columns.forEach((col, colIdx) => {
      if (col.type !== "image") return;
      const raw = record.cells[col.id] ?? "";
      if (!raw.trim().startsWith("data:image")) return;
      const img = getEmbeddableImageFormat(raw);
      if (!img) return;

      const imageId = workbook.addImage({
        buffer: Buffer.from(img.buffer) as any,
        extension: img.extension,
      });

      worksheet.addImage(imageId, {
        tl: { col: colIdx, row: recordIdx + 1 },
        ext: { width: IMAGE_DISPLAY_W, height: IMAGE_DISPLAY_H },
      });
    });
  });

  const buf = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buf as ArrayBuffer);
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
