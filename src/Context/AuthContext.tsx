import { createContext, useEffect, useState, type ReactNode } from "react";
import type {AuthContextType} from "../types/types";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);


    useEffect(() => {
        const storedToken = localStorage.getItem("user_token");
        const storedUserId = localStorage.getItem("user__id");
        if (storedToken) {
            setToken(storedToken);
        }

        if (storedUserId) {
            setUserId(Number(storedUserId));
        }
        setLoading(false);
    }, []);


    const login = (newToken: string, newId: number ) => {
        localStorage.setItem("user_token", newToken);
        localStorage.setItem("user__id", newId.toString());
        setToken(newToken);
        setUserId(newId)
        window.location.reload();
    };

    const logout = () => {
        localStorage.removeItem("user_token");
        setToken(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout,
            loading,
            userId,
        }}>
            {children}
        </AuthContext.Provider>
    );
}