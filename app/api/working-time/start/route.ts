import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const startSessionSchema = z.object({
    codigo: z.string().length(6).regex(/^\d+$/),
});

/**
 * API Route para iniciar una jornada laboral
 * POST /api/working-time/start
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { codigo } = startSessionSchema.parse(body);

        // Buscar o crear trabajador
        const ahora = new Date();
        let trabajador = await prisma.trabajador.findUnique({
            where: { codigo },
        });

        if (!trabajador) {
            // Crear trabajador si no existe
            trabajador = await prisma.trabajador.create({
                data: {
                    codigo,
                    isWorking: true,
                    ultimaEntrada: ahora,
                },
            });

            // Crear registro de inicio para nuevo trabajador
            await prisma.registro.create({
                data: {
                    codigoTrabajador: codigo,
                    horaEntrada: ahora,
                    horaSalida: ahora, // Temporal, se actualizará al terminar
                    tiempoTotal: 0, // Temporal, se calculará al terminar
                },
            });
        } else {
            // Si ya existe y está trabajando, retornar la hora de inicio existente
            if (trabajador.isWorking && trabajador.ultimaEntrada) {
                return NextResponse.json({
                    success: true,
                    isWorking: true,
                    startTime: trabajador.ultimaEntrada.toISOString(),
                    message: "Ya tienes una jornada activa",
                });
            }

            // Si no está trabajando, iniciar nueva jornada
            trabajador = await prisma.trabajador.update({
                where: { codigo },
                data: {
                    isWorking: true,
                    ultimaEntrada: ahora,
                },
            });

            // Crear registro de inicio solo si es una nueva jornada
            await prisma.registro.create({
                data: {
                    codigoTrabajador: codigo,
                    horaEntrada: ahora,
                    horaSalida: ahora, // Temporal, se actualizará al terminar
                    tiempoTotal: 0, // Temporal, se calculará al terminar
                },
            });
        }

        return NextResponse.json({
            success: true,
            isWorking: true,
            startTime: trabajador.ultimaEntrada!.toISOString(),
            message: "Jornada iniciada correctamente",
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: "Código inválido. Debe ser exactamente 6 dígitos numéricos." },
                { status: 400 }
            );
        }

        console.error("Error al iniciar jornada:", error);
        return NextResponse.json(
            { success: false, error: "Error al iniciar la jornada" },
            { status: 500 }
        );
    }
}

