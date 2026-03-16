import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { loginUser } from "@/lib/services/auth.services";

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = bodySchema.parse(body);
        const { email, password } = parsed;
        const { token, user } = await loginUser(email, password);
        return NextResponse.json({ token, user }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request body", details: error.flatten() },
                { status: 400 }
            );
        }
        if (error instanceof Error && error.message.includes("User not found")) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        if (error instanceof Error && error.message.includes("Invalid password")) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}