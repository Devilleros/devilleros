"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { ProdTableColumn, ProdTableColumnType } from "./types";
import { ProdTableWizardModel } from "./model";

type ProdTableWizardContextValue = {
  columns: ProdTableColumn[];
  setColumnTitle: (columnId: string, title: string) => void;
  setColumnType: (columnId: string, type: ProdTableColumnType) => void;
  addColumn: (type?: ProdTableColumnType) => void;
  removeColumn: (columnId: string) => void;
  resetToMock: () => void;
};

const ProdTableWizardContext = createContext<ProdTableWizardContextValue | undefined>(
  undefined
);

export function ProdTableWizardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [columns, setColumns] = useState<ProdTableColumn[]>(
    () => ProdTableWizardModel.createMockInitial()
  );

  const value = useMemo<ProdTableWizardContextValue>(() => {
    const setColumnTitle = (columnId: string, title: string) => {
      setColumns((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.setColumnTitle(columnId, title);
        return model.columns;
      });
    };

    const setColumnType = (columnId: string, type: ProdTableColumnType) => {
      setColumns((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.setColumnType(columnId, type);
        return model.columns;
      });
    };

    const addColumn = (type: ProdTableColumnType = "text") => {
      setColumns((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.addColumn(type);
        return model.columns;
      });
    };

    const removeColumn = (columnId: string) => {
      setColumns((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.removeColumn(columnId);
        return model.columns;
      });
    };

    const resetToMock = () => {
      setColumns(ProdTableWizardModel.createMockInitial());
    };

    return {
      columns,
      setColumnTitle,
      setColumnType,
      addColumn,
      removeColumn,
      resetToMock,
    };
  }, [columns]);

  return (
    <ProdTableWizardContext.Provider value={value}>
      {children}
    </ProdTableWizardContext.Provider>
  );
}

export function useProdTableWizard() {
  const ctx = useContext(ProdTableWizardContext);
  if (!ctx) {
    throw new Error("useProdTableWizard debe usarse dentro de ProdTableWizardProvider");
  }
  return ctx;
}

