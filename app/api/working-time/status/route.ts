import { NextResponse } from "next/server";

/**
 * API Route para obtener el estado de un trabajador
 * POST /api/working-time/status
 * Por ahora devuelve constantes.
 */
export async function POST() {
    return NextResponse.json({
        success: true,
        exists: true,
        isWorking: true,
        startTime: new Date().toISOString(),
    });
}
