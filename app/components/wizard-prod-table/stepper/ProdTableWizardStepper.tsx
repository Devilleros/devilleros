"use client";

export function ProdTableWizardStepper({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span
          className={
            step === 1
              ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium"
          }
        >
          1
        </span>
        <span className="hidden sm:inline">
          <span className={step === 1 ? "font-medium" : "text-muted-foreground"}>Columnas</span>
        </span>
      </div>

      <div className="flex-1 h-px bg-border/60" />

      <div className="flex items-center gap-2">
        <span
          className={
            step === 2
              ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium"
          }
        >
          2
        </span>
        <span className="hidden sm:inline">
          <span className={step === 2 ? "font-medium" : "text-muted-foreground"}>Siguientes</span>
        </span>
      </div>
    </div>
  );
}

