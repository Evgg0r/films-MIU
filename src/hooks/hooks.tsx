import {useContext, useEffect, useState} from "react";
import {FilterContext} from "../Context/FilterContext.tsx";
import type {AuthContextType, CreditsResponse, FilterContextType, Genre, MovieDetailsResponse, MovieResponse} from "../types/types.ts";
import {AuthContext} from "../Context/AuthContext.tsx";
import {fetchData} from "../api/fetch.tsx";
import {MOVIE_URL, URL_MOVIE_LIST, URL_POPULAR_LIST, URL_TOP_RATED_LIST} from "../constants/urls.ts";

export function useFilterContext(): FilterContextType {
    return useContext(FilterContext);
}

export function useLoadGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const {token} = useAuth()

    useEffect(() => {
        if (!token) {
            console.warn('Требуется авторизация');
            return;
        }

        fetchData(URL_MOVIE_LIST, token)
            .then((data) => setGenres(data.genres))
            .catch((error) => console.error(error));
    }, [token]);

    return genres;
}

export function useLoadMovies() {
    const [movies, setMovies] = useState<MovieResponse | null>(null);
    const { state } = useFilterContext();
    const {token} = useAuth()


    useEffect(() => {
        let url = '';

        if (!token) {
            console.warn('Требуется авторизация');
            return;
        }

        switch (state.sortBy) {
            case 'popular':
                url = `${URL_POPULAR_LIST}${state.page}`;
                break;
            case 'rating':
                url = `${URL_TOP_RATED_LIST}${state.page}`;
                break;
            default:
                return;
        }

        fetchData(url, token)
            .then((data: MovieResponse) => setMovies(data))
            .catch((error) => console.error('Ошибка при получении фильмов:', error));
    }, [state.sortBy, state.page, token]);

    return movies;
}

export function useLoadMovieInfo(movieId: string) {

    const [details, setDetails] = useState<MovieDetailsResponse>();
    const [credits, setCredits] = useState<CreditsResponse>();
    const {token} = useAuth()

    useEffect(() => {
            if (!token) {
                console.warn('Требуется авторизация');
                return;
            }
            if (!movieId) return;

            const infoUrl = `${MOVIE_URL}${movieId}?language=ru`;
            const creditsUrl = `${MOVIE_URL}${movieId}/credits?language=ru`;

            fetchData(infoUrl, token)
                .then((data) => setDetails(data))
                .catch(console.error);

            fetchData(creditsUrl, token)
                .then((data) => setCredits(data))
                .catch(console.error);
        }, [movieId, token]);

        return { details, credits };
}

export function useAuth():AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Ошибка контекста аутентификация>");
    }
    return context;
}