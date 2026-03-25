import type { ProdTableWizardState } from "../../../types/product-table/types";

export const WIZARD_STORAGE_KEY = "devilleros:product-table-wizard:v1";

export type WizardStep = 1 | 2 | 3;

export type PersistedWizardV1 = {
  v: 1;
  state: ProdTableWizardState;
  step: WizardStep;
};

export function loadPersistedWizard(): PersistedWizardV1 | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedWizardV1;
    if (parsed.v !== 1 || !parsed.state?.columns?.length) return null;
    if (parsed.step !== 1 && parsed.step !== 2 && parsed.step !== 3) return null;
    if (!Array.isArray(parsed.state.records)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function savePersistedWizard(data: PersistedWizardV1): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("[product-table] No se pudo guardar el borrador en localStorage:", e);
  }
}
