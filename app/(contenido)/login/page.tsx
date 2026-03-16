"use client"

import FormLogin from "@/app/components/login/FormLogin";

// import { signIn } from "@/lib/auth/auth-client";

export default function Login() {
    return (
        <FormLogin />
        // <div className="min-h-screen flex flex-col items-center justify-center ">
        //     <h1 className="text-4xl mb-4">Bienvenido a devilleros.com</h1>
        //     <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={signIn}>
        //         Iniciar sesión con Google
        //     </button>
        // </div>
    )
}