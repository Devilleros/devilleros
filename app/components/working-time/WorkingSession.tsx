"use client";

import { useEffect, useState } from "react";
import EndSessionButton from "./EndSessionButton";

interface WorkingSessionProps {
    workerCode: string;
    startTime: Date;
    onEndSession: () => void;
}

/**
 * Componente que muestra la vista de jornada laboral activa
 * Responsabilidad: Presentar el estado de la jornada y permitir terminarla
 */
export default function WorkingSession({
    workerCode,
    startTime,
    onEndSession,
}: WorkingSessionProps) {
    const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");

    // Calcular y actualizar el tiempo transcurrido cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now.getTime() - startTime.getTime();
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            setElapsedTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const formatStartTime = (date: Date): string => {
        return date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            {/* Mensaje de confirmación */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg
                        className="w-10 h-10 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    ¡Has empezado tu jornada!
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Cuando hayas terminado, avísanos
                </p>
            </div>

            {/* Información de la jornada */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Código de trabajador:
                    </span>
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {workerCode}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Hora de inicio:
                    </span>
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {formatStartTime(startTime)}
                    </span>
                </div>
            </div>

            {/* Cronómetro */}
            <div className="text-center space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Tiempo transcurrido
                </p>
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {elapsedTime}
                </div>
            </div>

            {/* Botón de terminar jornada */}
            <EndSessionButton onEndSession={onEndSession} />
        </div>
    );
}

