import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType } from "../types/types.ts";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("user_token");
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem("user_token", newToken);
        setToken(newToken);
        window.location.reload();
    };

    const logout = () => {
        localStorage.removeItem("user_token");
        setToken(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{token, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

