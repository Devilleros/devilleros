"use client"

import { useState } from "react";
import CodeInput from "../../../components/working-time/CodeInput";
import WorkingSession from "../../../components/working-time/WorkingSession";
import SessionSummaryModal from "../../../components/working-time/SessionSummaryModal";
import RecordsTable from "../../../components/working-time/RecordsTable";
import InfoButton from "../../../components/working-time/InfoButton";
import { useWorkingSession } from "@/hooks/working-time/useWorkingSession";

interface Record {
    id: number;
    codigo: string;
    horaEntrada: string;
    horaSalida: string;
    tiempoTotal: number;
    createdAt: string;
}

/**
 * Página principal del sistema de registro de jornada laboral
 * Responsabilidad: Orquestar los componentes y el estado de la aplicación
 */
export default function WorkingTimePage() {
    const { session, startSession, endSession, checkStatus, showSummary, closeSummary, isLoading, error } = useWorkingSession();
    const [showRecords, setShowRecords] = useState(false);
    const [records, setRecords] = useState<Record[]>([]);
    const [loadingRecords, setLoadingRecords] = useState(false);

    const handleCodeComplete = async (code: string) => {
        // startSession ya maneja si el trabajador está activo o no
        await startSession(code);
    };

    const handleEndSession = async () => {
        await endSession();
        // Recargar registros después de terminar
        await loadRecords();
    };

    const loadRecords = async () => {
        setLoadingRecords(true);
        try {
            const response = await fetch("/api/working-time/records");
            const data = await response.json();
            if (data.success) {
                setRecords(data.records);
            }
        } catch (err) {
            console.error("Error al cargar registros:", err);
        } finally {
            setLoadingRecords(false);
        }
    };

    const handleShowRecords = () => {
        setShowRecords(true);
        loadRecords();
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
                    Working Time
                </h1>
                
                {error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : session.isActive && session.startTime && session.workerCode ? (
                        <WorkingSession
                            workerCode={session.workerCode}
                            startTime={session.startTime}
                            onEndSession={handleEndSession}
                        />
                    ) : (
                        <CodeInput onCodeComplete={handleCodeComplete} />
                    )}
                </div>
            </div>

            {/* Botón flotante de información */}
            <InfoButton onClick={handleShowRecords} />

            {/* Modal de resumen de jornada */}
            {showSummary && session.startTime && session.endTime && session.totalTime !== null && session.workerCode && (
                <SessionSummaryModal
                    isOpen={showSummary}
                    onClose={closeSummary}
                    workerCode={session.workerCode}
                    startTime={session.startTime}
                    endTime={session.endTime}
                    totalTime={session.totalTime}
                />
            )}

            {/* Modal de tabla de registros */}
            <RecordsTable
                isOpen={showRecords}
                onClose={() => setShowRecords(false)}
                records={records}
                isLoading={loadingRecords}
            />
        </div>
    );
}