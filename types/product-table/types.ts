export type ProdTableColumnType = "text" | "image" | "number";

export type ProdTableColumn = {
  id: string;
  title: string;
  type: ProdTableColumnType;
};

// Por ahora todo se guarda como string en memoria (sin persistencia):
// - text: string ("" = vacío)
// - number: string ("" = vacío) y luego se parsea si lo necesitas
// - image: dataURL string ("" = vacío)
export type ProdTableRecordCells = Record<string, string>; // columnId -> cellValue

export type ProdTableRecord = {
  id: string;
  cells: ProdTableRecordCells;
};

export type ProdTableWizardState = {
  columns: ProdTableColumn[];
  records: ProdTableRecord[];
  activeRecordId: string | null;
};

