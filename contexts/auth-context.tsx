"use client";

import { User } from "@/types/user";
import { createContext, useState, useEffect } from "react";
import { AuthContextType } from "@/types/user";
import { AUTH_TOKEN_KEY, getMe } from "@/lib/api/auth";
import { login as loginApi } from "@/lib/api/auth";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
            getMe(token).then((user) => {
                setUser(user);
                setToken(token);
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
                localStorage.removeItem(AUTH_TOKEN_KEY);
                setUser(null);
                setToken(null);
                setIsLoading(false);
            });
        }else{
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setUser(null);
            setToken(null);
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        loginApi({email, password}).then(({token, user}) => {
            if (typeof window !== "undefined") {
                localStorage.setItem(AUTH_TOKEN_KEY, token);
            }
            setUser(user);
            setToken(token);
        }).catch((error) => {
            console.error(error);
        });
    }

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }
        setUser(null);
        setToken(null);
    }

    const isAuthenticated = !!user && !!token;

    return (
        <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}