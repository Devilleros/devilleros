import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { findUserByEmail } from "@/lib/services/user.services";

function getBearerToken(request: NextRequest) {
    const authorization = request.headers.get("Authorization");
    if (!authorization?.startsWith("Bearer ")) return null;
    return authorization.slice(7);
}

export async function GET(request: NextRequest) {
    const token = getBearerToken(request);
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
        return NextResponse.json({ error: "invalid or expired token" }, { status: 401 });
    }
    const user = await findUserByEmail(payload.email);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
}