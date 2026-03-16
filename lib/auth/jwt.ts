import * as jose from "jose";

const SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "no se lee la variable de entorno JWT_SECRET"
);
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export type JwtPayload = {
    sub: string; // subject | id del usuario
    email: string;
    role?: string;
}

export async function signToken(payload: JwtPayload): Promise<string> {
    return new jose.SignJWT({ ...payload })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(payload.sub)
        .setIssuedAt()
        .setExpirationTime(EXPIRES_IN)
        .sign(SECRET);
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
    try {
        const { payload } = await jose.jwtVerify(token, SECRET,);
        return {
            sub: payload.sub as string,
            email: payload.email as string,
            role: payload.role as string | undefined,
        }
    }catch (error) {
        console.error(error);
        return null;
    }
}