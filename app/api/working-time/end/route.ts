import { NextResponse } from "next/server";

/**
 * API Route para terminar una jornada laboral
 * POST /api/working-time/end
 * Por ahora devuelve constantes.
 */
export async function POST() {
    const endTime = new Date().toISOString();
    const startTime = new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(); // 8h antes
    const totalTime = 8 * 60 * 60 * 1000; // 8h en ms
    return NextResponse.json({
        success: true,
        startTime,
        endTime,
        totalTime,
        message: "Jornada terminada correctamente",
    });
}
