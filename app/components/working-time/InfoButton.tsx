"use client";

import { Info } from "lucide-react";

interface InfoButtonProps {
    onClick: () => void;
}

/**
 * Botón flotante de información para mostrar los registros
 * Responsabilidad: Proporcionar acceso rápido a la vista de registros
 */
export default function InfoButton({ onClick }: InfoButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center z-50"
            aria-label="Ver registros de jornadas"
        >
            <Info className="w-6 h-6" />
        </button>
    );
}

