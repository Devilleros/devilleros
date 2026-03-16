import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { registerUser } from "@/lib/services/auth.services";

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
    lastName: z.string().optional(),
  });

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = bodySchema.parse(body);
        const { email, password, name, lastName } = parsed;
        const user = await registerUser({ email, password, name, lastName });
        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request body", details: error.flatten() },
                { status: 400 }
            );
        }
        if (error instanceof Error && error.message.includes("User already exists")) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}