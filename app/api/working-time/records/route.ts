import { NextResponse } from "next/server";

/**
 * API Route para obtener todos los registros de jornadas
 * GET /api/working-time/records
 * Por ahora devuelve constantes.
 */
export async function GET() {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const records = [
        {
            id: "1",
            codigo: "123456",
            horaEntrada: `${today}T08:00:00.000Z`,
            horaSalida: `${today}T16:00:00.000Z`,
            tiempoTotal: 8 * 60 * 60 * 1000,
            createdAt: now.toISOString(),
        },
        {
            id: "2",
            codigo: "654321",
            horaEntrada: `${today}T09:00:00.000Z`,
            horaSalida: `${today}T17:00:00.000Z`,
            tiempoTotal: 8 * 60 * 60 * 1000,
            createdAt: new Date(now.getTime() - 86400000).toISOString(),
        },
    ];
    return NextResponse.json({
        success: true,
        records,
    });
}
