"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui-drawio/dialog";
import { CheckCircle2, Clock, Calendar } from "lucide-react";

interface SessionSummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    workerCode: string;
    startTime: Date;
    endTime: Date;
    totalTime: number; // tiempo en milisegundos
}

/**
 * Componente modal que muestra el resumen de la jornada laboral terminada
 * Responsabilidad: Presentar un resumen visual y atractivo de la sesión completada
 */
export default function SessionSummaryModal({
    isOpen,
    onClose,
    workerCode,
    startTime,
    endTime,
    totalTime,
}: SessionSummaryModalProps) {
    // Formatear el tiempo total trabajado
    const formatTotalTime = (milliseconds: number): string => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
                <DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-4">
                        {/* Icono de éxito */}
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900">
                            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                        </div>

                        <DialogTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                            ¡Has terminado tu jornada laboral!
                        </DialogTitle>
                        <DialogDescription className="text-center text-base text-gray-600 dark:text-gray-400">
                            Has trabajado <span className="font-bold text-blue-600 dark:text-blue-400">{formatTotalTime(totalTime)}</span>
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* Información detallada */}
                <div className="space-y-4 py-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Fecha
                                </p>
                                <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                    {formatDate(startTime)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-1">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Hora de entrada
                                    </p>
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                        {formatTime(startTime)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Hora de salida
                                    </p>
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                        {formatTime(endTime)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Código de trabajador:
                                </span>
                                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    {workerCode}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tiempo total destacado */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg p-6 text-center">
                        <p className="text-sm font-medium text-blue-100 mb-2">
                            Tiempo total trabajado
                        </p>
                        <p className="text-4xl font-bold text-white font-mono">
                            {formatTotalTime(totalTime)}
                        </p>
                    </div>
                </div>

                {/* Botón de cerrar */}
                <div className="flex justify-center pt-4">
                    <button
                        onClick={onClose}
                        className="w-full max-w-xs py-3 px-6 rounded-lg font-semibold text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
                    >
                        Cerrar
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

