"use client";

import { useState } from "react";
import { ProdTableWizardProvider } from "./ProdTableWizardProvider";
import { Step1EditColumns } from "./step-1/Step1EditColumns";
import { Step2EditRecords } from "@/app/components/wizard-prod-table/step-2/Step2EditRecords";
import { Step3Preview } from "@/app/components/wizard-prod-table/step-3/Step3Preview";
import { ProdTableWizardStepper } from "./stepper/ProdTableWizardStepper";

export function ProdTableWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <ProdTableWizardProvider>
      <div className="mx-auto w-full max-w-5xl space-y-6 py-6 pl-4 pr-4">
        <ProdTableWizardStepper step={step} />

        {step === 1 && <Step1EditColumns onNext={() => setStep(2)} />}
        {step === 2 && (
          <Step2EditRecords
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && <Step3Preview onBack={() => setStep(2)} />}
      </div>
    </ProdTableWizardProvider>
  );
}

