"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui-drawio/dialog";
import { ScrollArea } from "@/app/components/ui-drawio/scroll-area";
import { Clock, Calendar, Activity } from "lucide-react";

interface Record {
    id: number;
    codigo: string;
    horaEntrada: string;
    horaSalida: string;
    tiempoTotal: number;
    createdAt: string;
}

interface RecordsTableProps {
    isOpen: boolean;
    onClose: () => void;
    records: Record[];
    isLoading?: boolean;
}

/**
 * Componente que muestra una tabla con todos los registros de jornadas laborales
 * Responsabilidad: Presentar los registros de manera clara y organizada
 */
export default function RecordsTable({
    isOpen,
    onClose,
    records,
    isLoading = false,
}: RecordsTableProps) {
    const formatTime = (isoString: string): string => {
        return new Date(isoString).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatDate = (isoString: string): string => {
        return new Date(isoString).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-4xl bg-white dark:bg-gray-900 max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Registros de Jornadas Laborales
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Historial completo de todas las jornadas registradas
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] pr-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : records.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <p>No hay registros disponibles</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Código
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Fecha
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Hora Entrada
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Hora Salida
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Tiempo Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <td className="py-3 px-4">
                                                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                                                    {record.codigo}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(record.horaEntrada)}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="font-mono">
                                                        {formatTime(record.horaEntrada)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                {record.tiempoTotal === 0 ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700">
                                                            <Activity className="w-4 h-4 text-yellow-600 dark:text-yellow-400 animate-pulse" />
                                                            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                                                                Aún trabajando
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="font-mono">
                                                            {formatTime(record.horaSalida)}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                {record.tiempoTotal === 0 ? (
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                                                        En curso...
                                                    </span>
                                                ) : (
                                                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                        {formatTotalTime(record.tiempoTotal)}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </ScrollArea>

                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

