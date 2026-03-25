"use client";

import { useState } from "react";
import { ProdTableWizardProvider } from "./ProdTableWizardProvider";
import { Step1EditColumns } from "./step-1/Step1EditColumns";
import { Step2Placeholder } from "./step-2/Step2Placeholder";
import { ProdTableWizardStepper } from "./stepper/ProdTableWizardStepper";

export function ProdTableWizard() {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <ProdTableWizardProvider>
      <div className="mx-auto w-full max-w-4xl space-y-6 py-6 pl-4 pr-4">
        <ProdTableWizardStepper step={step} />

        {step === 1 ? (
          <Step1EditColumns onNext={() => setStep(2)} />
        ) : (
          <Step2Placeholder onBack={() => setStep(1)} />
        )}
      </div>
    </ProdTableWizardProvider>
  );
}

