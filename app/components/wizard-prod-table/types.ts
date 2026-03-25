export type ProdTableColumnType = "text" | "image" | "number";

export type ProdTableColumn = {
  id: string;
  title: string;
  type: ProdTableColumnType;
};

export type ProdTableWizardState = {
  columns: ProdTableColumn[];
};

