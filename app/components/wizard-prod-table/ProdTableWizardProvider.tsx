"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ProdTableColumn, ProdTableColumnType, ProdTableWizardState } from "../../../types/product-table/types";
import { ProdTableWizardModel } from "./model";
import type { ProdTableRecord } from "../../../types/product-table/types";
import {
  loadPersistedWizard,
  savePersistedWizard,
  type WizardStep,
} from "./wizard-storage";

type ProdTableWizardContextValue = {
  step: WizardStep;
  setStep: (step: WizardStep) => void;
  columns: ProdTableColumn[];
  records: ProdTableRecord[];
  activeRecordId: string | null;
  setColumnTitle: (columnId: string, title: string) => void;
  setColumnType: (columnId: string, type: ProdTableColumnType) => void;
  addColumn: (type?: ProdTableColumnType) => void;
  removeColumn: (columnId: string) => void;
  resetToMock: () => void;

  addRecord: () => void;
  removeRecord: (recordId: string) => void;
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
  const [step, setStep] = useState<WizardStep>(1);
  /** Evita sobrescribir localStorage con el estado por defecto antes de leer el borrador. */
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const loaded = loadPersistedWizard();
    if (loaded) {
      setState(loaded.state);
      setStep(loaded.step);
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    const id = window.setTimeout(() => {
      savePersistedWizard({ v: 1, state, step });
    }, 500);
    return () => window.clearTimeout(id);
  }, [state, step, storageReady]);

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
      setStep(1);
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

    const removeRecord = (recordId: string) => {
      setState((prev) => {
        const model = new ProdTableWizardModel(prev);
        model.removeRecord(recordId);
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
      step,
      setStep,
      columns: state.columns,
      records: state.records,
      activeRecordId: state.activeRecordId,
      setColumnTitle,
      setColumnType,
      addColumn,
      removeColumn,
      resetToMock,
      addRecord,
      removeRecord,
      setActiveRecordId,
      updateCell,
    };
  }, [state, step]);

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

