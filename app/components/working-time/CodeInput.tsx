"use client";

import { useState, useRef } from "react";

interface CodeInputProps {
    onCodeComplete?: (code: string) => void;
}

export default function CodeInput({ onCodeComplete }: CodeInputProps) {
    const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Verificar si todos los dígitos están completos
    const isComplete = digits.every((digit) => digit !== "");

    // Manejar cambio en un input
    const handleChange = (index: number, value: string) => {
        // Solo permitir números
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        // Mover al siguiente input si se ingresó un dígito
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Manejar tecla de retroceso
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Manejar pegado de código completo
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const pastedDigits = pastedData.split("").filter((char) => /^\d$/.test(char));

        if (pastedDigits.length > 0) {
            const newDigits = [...digits];
            pastedDigits.forEach((digit, i) => {
                if (i < 6) {
                    newDigits[i] = digit;
                }
            });
            setDigits(newDigits);

            // Enfocar el último input llenado o el siguiente disponible
            const nextIndex = Math.min(pastedDigits.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    // Limpiar todos los inputs
    const handleClear = () => {
        setDigits(Array(6).fill(""));
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                    Ingrese su código de trabajador
                </h2>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Ingrese su código único de 6 dígitos
                </p>
            </div>

            {/* Inputs de código */}
            <div className="flex justify-center gap-3">
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        style={{
                            borderColor: digit
                                ? "rgb(59, 130, 246)"
                                : "rgb(209, 213, 219)",
                        }}
                    />
                ))}
            </div>

            {/* Botón de limpiar */}
            {isComplete && (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline transition-colors"
                    >
                        Limpiar código
                    </button>
                </div>
            )}

            {/* Botón de iniciar jornada */}
            <div className="flex justify-center">
                <button
                    type="button"
                    disabled={!isComplete}
                    onClick={() => {
                        if (isComplete && onCodeComplete) {
                            onCodeComplete(digits.join(""));
                        }
                    }}
                    className={`w-full max-w-xs py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
                        isComplete
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                            : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                >
                    Empezar a Trabajar
                </button>
            </div>
        </div>
    );
}

