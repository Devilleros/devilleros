import type {
  ProdTableColumn,
  ProdTableColumnType,
  ProdTableRecord,
  ProdTableWizardState,
} from "../../../types/product-table/types";

const createId = () => {
  // crypto.randomUUID() existe en navegadores modernos. Fallback para entornos viejos/dev.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `col_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export class ProdTableWizardModel {
  columns: ProdTableColumn[];
  records: ProdTableRecord[];
  activeRecordId: string | null;

  constructor(state: ProdTableWizardState) {
    // Copiamos para evitar mutar referencias externas (React-friendly).
    this.columns = state.columns.map((c) => ({ ...c }));
    this.records = state.records.map((r) => ({
      ...r,
      cells: { ...r.cells },
    }));
    this.activeRecordId = state.activeRecordId;
  }

  static createMockInitialColumns(): ProdTableColumn[] {
    // MOCK inicial (3 columnas) para el Step 1.
    return [
      { id: "col_image", title: "Imagen", type: "image" },
      { id: "col_text", title: "Descripción", type: "text" },
      { id: "col_number", title: "Cantidad", type: "number" },
    ];
  }

  private static createEmptyCells(columns: ProdTableColumn[]) {
    const cells: Record<string, string> = {};
    for (const c of columns) {
      cells[c.id] = "";
    }
    return cells;
  }

  static createMockInitialState(): ProdTableWizardState {
    const columns = ProdTableWizardModel.createMockInitialColumns();
    const recordId = createId();
    const record: ProdTableRecord = {
      id: recordId,
      cells: ProdTableWizardModel.createEmptyCells(columns),
    };

    return {
      columns,
      records: [record],
      activeRecordId: recordId,
    };
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
    // OJO: agregamos la celda vacía en TODOS los registros existentes.
    const newColumn: ProdTableColumn = {
      id: createId(),
      title: "",
      type,
    };

    this.columns = [
      ...this.columns,
      {
        ...newColumn,
      },
    ];

    this.records = this.records.map((r) => ({
      ...r,
      cells: { ...r.cells, [newColumn.id]: "" },
    }));
  }

  removeColumn(columnId: string) {
    if (this.columns.length <= 1) return;
    this.columns = this.columns.filter((c) => c.id !== columnId);
    this.records = this.records.map((r) => {
      const nextCells = { ...r.cells };
      delete nextCells[columnId];
      return { ...r, cells: nextCells };
    });
  }

  resetToMock() {
    const next = ProdTableWizardModel.createMockInitialState();
    this.columns = next.columns;
    this.records = next.records;
    this.activeRecordId = next.activeRecordId;
  }

  setActiveRecordId(recordId: string) {
    const exists = this.records.some((r) => r.id === recordId);
    if (!exists) return;
    this.activeRecordId = recordId;
  }

  addRecord(maxRecords: number) {
    if (this.records.length >= maxRecords) return;
    const recordId = createId();
    const newRecord: ProdTableRecord = {
      id: recordId,
      cells: ProdTableWizardModel.createEmptyCells(this.columns),
    };
    this.records = [...this.records, newRecord];
    this.activeRecordId = recordId;
  }

  removeRecord(recordId: string) {
    if (this.records.length <= 1) return;
    const idx = this.records.findIndex((r) => r.id === recordId);
    if (idx === -1) return;
    const wasActive = this.activeRecordId === recordId;
    this.records = this.records.filter((r) => r.id !== recordId);
    if (wasActive) {
      const nextIdx = Math.min(idx, this.records.length - 1);
      this.activeRecordId = this.records[nextIdx]?.id ?? null;
    }
  }

  updateCell(recordId: string, columnId: string, value: string) {
    this.records = this.records.map((r) => {
      if (r.id !== recordId) return r;
      return {
        ...r,
        cells: {
          ...r.cells,
          [columnId]: value,
        },
      };
    });
  }
}

