import { NextResponse } from "next/server";

/**
 * API Route para iniciar una jornada laboral
 * POST /api/working-time/start
 * Por ahora devuelve constantes.
 */
export async function POST() {
    const startTime = new Date().toISOString();
    return NextResponse.json({
        success: true,
        isWorking: true,
        startTime,
        message: "Jornada iniciada correctamente",
    });
}
