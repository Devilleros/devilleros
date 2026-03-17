"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/userSession";

export default function FormLogin() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        setIsLoading(true);
        try {
            await login(email, password);
            router.push("/");
            router.refresh();
            setIsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error de conexión. Intenta de nuevo.");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 text-center mb-1 tracking-tight">
                    devilleros.com
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-8">
                    Bienvenido, inicia sesión para continuar
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xl shadow-slate-200/50 dark:shadow-black/20 p-6"
                >
                    {error && (
                        <p className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </p>
                    )}
                    <div className="space-y-5">
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Email
                            </span>
                            <input
                                name="email"
                                type="email"
                                required
                                disabled={isLoading}
                                placeholder="tu@email.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-400 dark:focus:ring-amber-400/40 dark:focus:border-amber-500 transition disabled:opacity-60"
                            />
                        </label>
                        <label className="block">
                            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Contraseña
                            </span>
                            <input
                                name="password"
                                type="password"
                                required
                                disabled={isLoading}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-400 dark:focus:ring-amber-400/40 dark:focus:border-amber-500 transition disabled:opacity-60"
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 py-3 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-medium shadow-lg shadow-slate-800/25 dark:shadow-slate-200/20 hover:bg-slate-700 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Iniciando sesión…" : "Iniciar sesión"}
                    </button>
                </form>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
                    No tienes una cuenta? <Link href="/login/register">Regístrate</Link>
                </p>
            </div>
        </div>
    );
}