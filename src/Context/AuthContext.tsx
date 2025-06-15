import { createContext, useEffect, useState, type ReactNode } from "react";
import type {AuthContextType, FavoriteMoviesResponse} from "../types/types";
import {fetchData} from "../api/fetch";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("user_token");
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/account/${userId}/favorite/movies?language=ru&page=1&sort_by=created_at.asc`
        fetchData(url)
            .then((data: FavoriteMoviesResponse) => setFavorites(data.results.map((movie) => movie.id)))
            .catch(console.error);
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

    const toggleFavorite = async (movieId: number, isFav: boolean) => {
        const url = `https://api.themoviedb.org/3/account/${userId}/favorite`;

        try {
            await fetchData(url, {
                media_type: "movie",
                media_id: movieId,
                favorite: !isFav,
            });

            setFavorites((prev) =>
                isFav ? prev.filter((id) => id !== movieId) : [...prev, movieId]
            );
        } catch (error) {
            console.error("Ошибка при обновлении избранного:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout,
            loading,
            userId,
            favorites,
            toggleFavorite
        }}>
            {children}
        </AuthContext.Provider>
    );
}