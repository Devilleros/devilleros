"use client";

import { User } from "@/types/user";
import { createContext, useState, useEffect } from "react";
import { AuthContextType } from "@/types/user";
import { getMe, logout as logoutApi } from "@/lib/api/auth";
import { login as loginApi } from "@/lib/api/auth";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        setIsLoading(true);

        const fetchUser = async () => {
            try {
                const { user } = await getMe();
                setUser(user);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const { user } = await loginApi({email, password});
            setUser(user);
        } catch (error) {
            setIsLoading(false);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        try {
            const { message } = await logoutApi();
            setUser(null);
        } catch (error) {
            throw error;
        }
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}