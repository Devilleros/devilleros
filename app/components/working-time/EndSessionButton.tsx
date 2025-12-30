"use client";

interface EndSessionButtonProps {
    onEndSession: () => void;
}

/**
 * Componente para terminar la jornada laboral
 * Responsabilidad: Proporcionar la acción de finalizar la sesión de trabajo
 */
export default function EndSessionButton({ onEndSession }: EndSessionButtonProps) {
    return (
        <div className="flex justify-center pt-4">
            <button
                type="button"
                onClick={onEndSession}
                className="w-full max-w-xs py-4 px-6 rounded-lg font-semibold text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
            >
                Terminar Jornada
            </button>
        </div>
    );
}

