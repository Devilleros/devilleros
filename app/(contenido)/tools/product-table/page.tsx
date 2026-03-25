"use client";

import { ProdTableWizard } from "@/app/components/wizard-prod-table/ProdTableWizard";

export default function ProductTablePage() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <ProdTableWizard />
    </div>
  );
}