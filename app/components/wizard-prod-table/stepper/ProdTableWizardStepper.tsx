"use client";

export function ProdTableWizardStepper({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-2">
        <span
          className={
            step === 1
              ? "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              : "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium"
          }
        >
          1
        </span>
        <span className="hidden sm:inline">
          <span className={step === 1 ? "font-medium" : "text-muted-foreground"}>Columnas</span>
        </span>
      </div>

      <div className="min-w-2 flex-1 h-px bg-border/60" />

      <div className="flex items-center gap-2">
        <span
          className={
            step === 2
              ? "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              : "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium"
          }
        >
          2
        </span>
        <span className="hidden sm:inline">
          <span className={step === 2 ? "font-medium" : "text-muted-foreground"}>Registros</span>
        </span>
      </div>

      <div className="min-w-2 flex-1 h-px bg-border/60" />

      <div className="flex items-center gap-2">
        <span
          className={
            step === 3
              ? "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium"
              : "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium"
          }
        >
          3
        </span>
        <span className="hidden sm:inline">
          <span className={step === 3 ? "font-medium" : "text-muted-foreground"}>Vista previa</span>
        </span>
      </div>
    </div>
  );
}

