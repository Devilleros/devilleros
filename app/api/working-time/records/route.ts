import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * API Route para obtener todos los registros de jornadas
 * GET /api/working-time/records
 * Ordenados por más recientes primero
 */
export async function GET() {
    try {
        const registros = await prisma.registro.findMany({
            include: {
                trabajador: {
                    select: {
                        codigo: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Formatear los registros para el frontend
        const registrosFormateados = registros.map((registro) => ({
            id: registro.id,
            codigo: registro.codigoTrabajador,
            horaEntrada: registro.horaEntrada.toISOString(),
            horaSalida: registro.horaSalida.toISOString(),
            tiempoTotal: Number(registro.tiempoTotal), // Convertir BigInt a Number
            createdAt: registro.createdAt.toISOString(),
        }));

        return NextResponse.json({
            success: true,
            records: registrosFormateados,
        });
    } catch (error) {
        console.error("Error al obtener registros:", error);
        return NextResponse.json(
            { success: false, error: "Error al obtener los registros" },
            { status: 500 }
        );
    }
}

