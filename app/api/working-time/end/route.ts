import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const endSessionSchema = z.object({
    codigo: z.string().length(6).regex(/^\d+$/),
});

/**
 * API Route para terminar una jornada laboral
 * POST /api/working-time/end
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { codigo } = endSessionSchema.parse(body);

        // Buscar trabajador
        const trabajador = await prisma.trabajador.findUnique({
            where: { codigo },
        });

        if (!trabajador) {
            return NextResponse.json(
                { success: false, error: "Trabajador no encontrado" },
                { status: 404 }
            );
        }

        if (!trabajador.isWorking || !trabajador.ultimaEntrada) {
            return NextResponse.json(
                { success: false, error: "No tienes una jornada activa" },
                { status: 400 }
            );
        }

        const ahora = new Date();
        const tiempoTotal = ahora.getTime() - trabajador.ultimaEntrada.getTime();

        // Actualizar el último registro (el que se creó al iniciar)
        const ultimoRegistro = await prisma.registro.findFirst({
            where: {
                codigoTrabajador: codigo,
                horaEntrada: trabajador.ultimaEntrada,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (ultimoRegistro) {
            await prisma.registro.update({
                where: { id: ultimoRegistro.id },
                data: {
                    horaSalida: ahora,
                    tiempoTotal: tiempoTotal,
                },
            });
        }

        // Actualizar trabajador
        await prisma.trabajador.update({
            where: { codigo },
            data: {
                isWorking: false,
            },
        });

        return NextResponse.json({
            success: true,
            startTime: trabajador.ultimaEntrada.toISOString(),
            endTime: ahora.toISOString(),
            totalTime: tiempoTotal,
            message: "Jornada terminada correctamente",
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: "Código inválido. Debe ser exactamente 6 dígitos numéricos." },
                { status: 400 }
            );
        }

        console.error("Error al terminar jornada:", error);
        return NextResponse.json(
            { success: false, error: "Error al terminar la jornada" },
            { status: 500 }
        );
    }
}

