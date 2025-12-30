import { useState, useCallback, useEffect } from "react";

export interface WorkingSessionState {
    isActive: boolean;
    workerCode: string | null;
    startTime: Date | null;
    endTime: Date | null;
    totalTime: number | null; // tiempo en milisegundos
}

export interface UseWorkingSessionReturn {
    session: WorkingSessionState;
    startSession: (workerCode: string) => Promise<void>;
    endSession: () => Promise<void>;
    checkStatus: (workerCode: string) => Promise<void>;
    showSummary: boolean;
    closeSummary: () => void;
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook personalizado para manejar el estado de la jornada laboral
 * Sigue principios de arquitectura limpia separando la lógica de negocio
 */
export function useWorkingSession(): UseWorkingSessionReturn {
    const [session, setSession] = useState<WorkingSessionState>({
        isActive: false,
        workerCode: null,
        startTime: null,
        endTime: null,
        totalTime: null,
    });
    const [showSummary, setShowSummary] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkStatus = useCallback(async (workerCode: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch("/api/working-time/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ codigo: workerCode }),
            });

            const data = await response.json();

            if (data.success && data.exists && data.isWorking && data.startTime) {
                setSession({
                    isActive: true,
                    workerCode,
                    startTime: new Date(data.startTime),
                    endTime: null,
                    totalTime: null,
                });
            } else {
                setSession({
                    isActive: false,
                    workerCode: null,
                    startTime: null,
                    endTime: null,
                    totalTime: null,
                });
            }
        } catch (err) {
            console.error("Error al verificar estado:", err);
            setError("Error al verificar el estado del trabajador");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const startSession = useCallback(async (workerCode: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch("/api/working-time/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ codigo: workerCode }),
            });

            const data = await response.json();

            if (data.success) {
                setSession({
                    isActive: true,
                    workerCode,
                    startTime: new Date(data.startTime),
                    endTime: null,
                    totalTime: null,
                });
                setShowSummary(false);
            } else {
                setError(data.error || "Error al iniciar la jornada");
            }
        } catch (err) {
            console.error("Error al iniciar jornada:", err);
            setError("Error al iniciar la jornada");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const endSession = useCallback(async () => {
        if (!session.workerCode) return;

        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch("/api/working-time/end", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ codigo: session.workerCode }),
            });

            const data = await response.json();

            if (data.success) {
                setSession({
                    isActive: false,
                    workerCode: session.workerCode,
                    startTime: new Date(data.startTime),
                    endTime: new Date(data.endTime),
                    totalTime: data.totalTime,
                });
                setShowSummary(true);
            } else {
                setError(data.error || "Error al terminar la jornada");
            }
        } catch (err) {
            console.error("Error al terminar jornada:", err);
            setError("Error al terminar la jornada");
        } finally {
            setIsLoading(false);
        }
    }, [session.workerCode]);

    const closeSummary = useCallback(() => {
        setShowSummary(false);
        setSession({
            isActive: false,
            workerCode: null,
            startTime: null,
            endTime: null,
            totalTime: null,
        });
    }, []);

    return {
        session,
        startSession,
        endSession,
        checkStatus,
        showSummary,
        closeSummary,
        isLoading,
        error,
    };
}

