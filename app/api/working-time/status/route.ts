import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const statusSchema = z.object({
    codigo: z.string().length(6).regex(/^\d+$/),
});

/**
 * API Route para obtener el estado de un trabajador
 * POST /api/working-time/status
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { codigo } = statusSchema.parse(body);

        const trabajador = await prisma.trabajador.findUnique({
            where: { codigo },
        });

        if (!trabajador) {
            return NextResponse.json({
                success: true,
                exists: false,
                isWorking: false,
            });
        }

        return NextResponse.json({
            success: true,
            exists: true,
            isWorking: trabajador.isWorking,
            startTime: trabajador.ultimaEntrada?.toISOString() || null,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: "Código inválido. Debe ser exactamente 6 dígitos numéricos." },
                { status: 400 }
            );
        }

        console.error("Error al obtener estado:", error);
        return NextResponse.json(
            { success: false, error: "Error al obtener el estado" },
            { status: 500 }
        );
    }
}

