"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { ProdTableColumn, ProdTableColumnType, ProdTableWizardState } from "../../../types/product-table/types";
import { ProdTableWizardModel } from "./model";
import type { ProdTableRecord } from "../../../types/product-table/types";

type ProdTableWizardContextValue = {
  columns: ProdTableColumn[];
  records: ProdTableRecord[];
  activeRecordId: string | null;
  setColumnTitle: (columnId: string, title: string) => void;
  setColumnType: (columnId: string, type: ProdTableColumnType) => void;
  addColumn: (type?: ProdTableColumnType) => void;
  removeColumn: (columnId: string) => void;
  resetToMock: () => void;

  addRecord: () => void;
  setActiveRecordId: (recordId: string) => void;
  updateCell: (recordId: string, columnId: string, value: string) => void;
};

const ProdTableWizardContext = createContext<ProdTableWizardContextValue | undefined>(
  undefined
);

const MAX_RECORDS = 200;

export function ProdTableWizardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ProdTableWizardState>(() =>
    ProdTableWizardModel.createMockInitialState()
  );

  const value = useMemo<ProdTableWizardContextValue>(() => {
    const setColumnTitle = (columnId: string, title: string) => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.setColumnTitle(columnId, title);
        return {
          columns: model.columns,
          records: model.records,
          activeRecordId: model.activeRecordId,
        };
      });
    };

    const setColumnType = (columnId: string, type: ProdTableColumnType) => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.setColumnType(columnId, type);
        return {
          columns: model.columns,
          records: model.records,
          activeRecordId: model.activeRecordId,
        };
      });
    };

    const addColumn = (type: ProdTableColumnType = "text") => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.addColumn(type);
        return {
          columns: model.columns,
          records: model.records,
          activeRecordId: model.activeRecordId,
        };
      });
    };

    const removeColumn = (columnId: string) => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.removeColumn(columnId);
        return {
          columns: model.columns,
          records: model.records,
          activeRecordId: model.activeRecordId,
        };
      });
    };

    const resetToMock = () => {
      setState(ProdTableWizardModel.createMockInitialState());
    };

    const addRecord = () => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.addRecord(MAX_RECORDS);
        return {
          columns: model.columns,
          records: model.records,
          activeRecordId: model.activeRecordId,
        };
      });
    };

    const setActiveRecordId = (recordId: string) => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.setActiveRecordId(recordId);
        return {
          columns: model.columns,
          records: model.records,
          activeRecordId: model.activeRecordId,
        };
      });
    };

    const updateCell = (recordId: string, columnId: string, value: string) => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.updateCell(recordId, columnId, value);
        return {
          columns: model.columns,
          records: model.records,
          activeRecordId: model.activeRecordId,
        };
      });
    };

    return {
      columns: state.columns,
      records: state.records,
      activeRecordId: state.activeRecordId,
      setColumnTitle,
      setColumnType,
      addColumn,
      removeColumn,
      resetToMock,
      addRecord,
      setActiveRecordId,
      updateCell,
    };
  }, [state]);

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

