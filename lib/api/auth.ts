// export const AUTH_TOKEN_KEY = "auth_token";

import { User } from "@/types/user";

export type LoginCredentials = {
    email: string;
    password: string;
};

export type LoginSuccess = {
    //token: string;
    user: User;
};

export async function login(credentials: LoginCredentials): Promise<LoginSuccess> {
    const res = await fetch("/api/auth/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const message = typeof data.error === "string" ? data.error : "Error al iniciar sesión";
        throw new Error(message);
    }

    if (!data.user) {
        throw new Error("Error al iniciar sesión");
    }

    return { user: data.user };
}

export type RegisterCredentials = {
    email: string;
    password: string;
    name?: string;
    lastName?: string;
};

export type RegisterSuccess = {
    user: User;
};

export async function register(credentials: RegisterCredentials): Promise<RegisterSuccess> {
    const res = await fetch("/api/auth/register", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const message = typeof data.error === "string" ? data.error : "Error al registrarse";
        throw new Error(message);
    }

    if (!data.user) {
        throw new Error("Error al registrarse");
    }

    return { user: data.user };
}

export type GetMeSuccess = {
    user: User;
};

export async function getMe(): Promise<GetMeSuccess> {
    const res = await fetch("/api/me", {
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Error al obtener el usuario");
    }
    const data = await res.json().catch(() => ({}));
    return { user: data.user };
}

export type LogoutSuccess = {
    message: string;
};

export async function logout(): Promise<LogoutSuccess> {
    const res = await fetch("/api/auth/logout", {
        credentials: "include",
        method: "POST",
    });
    if (!res.ok) {
        throw new Error("Error al cerrar sesión");
    }
    return { message: "Sesión cerrada correctamente" };
}