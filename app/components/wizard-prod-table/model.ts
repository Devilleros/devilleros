import type { ProdTableColumn, ProdTableColumnType } from "./types";

const createId = () => {
  // crypto.randomUUID() existe en navegadores modernos. Fallback para entornos viejos/dev.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `col_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export class ProdTableWizardModel {
  columns: ProdTableColumn[];

  constructor(columns: ProdTableColumn[]) {
    // Copiamos para evitar mutar referencias externas (React-friendly).
    this.columns = columns.map((c) => ({ ...c }));
  }

  static createMockInitial(): ProdTableColumn[] {
    // MOCK inicial (3 columnas) para el Step 1.
    // Nota: si después quieres editar títulos iniciales o el orden, se hace aquí.
    return [
      { id: "col_image", title: "Imagen", type: "image" },
      { id: "col_text", title: "Descripción", type: "text" },
      { id: "col_number", title: "Cantidad", type: "number" },
    ];
  }

  setColumnTitle(columnId: string, title: string) {
    const col = this.columns.find((c) => c.id === columnId);
    if (!col) return;
    col.title = title;
  }

  setColumnType(columnId: string, type: ProdTableColumnType) {
    const col = this.columns.find((c) => c.id === columnId);
    if (!col) return;
    col.type = type;
  }

  addColumn(type: ProdTableColumnType = "text") {
    this.columns = [
      ...this.columns,
      {
        id: createId(),
        title: "",
        type,
      },
    ];
  }

  removeColumn(columnId: string) {
    if (this.columns.length <= 1) return;
    this.columns = this.columns.filter((c) => c.id !== columnId);
  }

  resetToMock() {
    this.columns = ProdTableWizardModel.createMockInitial();
  }
}

