import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { findUserByEmail } from "@/lib/services/user.services";
import { AUTH_COOKIE_NAME } from "@/lib/auth/cookies";

// function getBearerToken(request: NextRequest) {
//     const authorization = request.headers.get("Authorization");
//     if (!authorization?.startsWith("Bearer ")) return null;
//     return authorization.slice(7);
// }

function getTokenFromCookie(request: NextRequest): string | null {
    const cookie = request.cookies.get(AUTH_COOKIE_NAME);
    return cookie?.value ?? null;
}

export async function GET(request: NextRequest) {
    const token = getTokenFromCookie(request);
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: "invalid or expired token" }, { status: 401 });
    }
    const privateUser = await findUserByEmail(payload.email);
    if (!privateUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const user = {
        id: privateUser?.id,
        email: privateUser?.email,
        name: privateUser?.name,
        lastName: privateUser?.lastName,
        role: privateUser?.role,
    }
    return NextResponse.json({ user }, { status: 200 });
}