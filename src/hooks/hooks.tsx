import {useContext, useEffect, useState} from "react";
import {FilterContext} from "../Context/FilterContext";
import type {AuthContextType, CreditsResponse, FilterContextType, Genre, MovieDetailsResponse, MovieResponse} from "../types/types";
import {AuthContext} from "../Context/AuthContext";
import {fetchData} from "../api/fetch";
import {MOVIE_URL, URL_MOVIE_LIST, URL_POPULAR_LIST, URL_TOP_RATED_LIST} from "../constants/urls";
import {ModalContext} from "../Context/ModalContext";

export function useFilterContext(): FilterContextType {
    return useContext(FilterContext);
}

export function useLoadGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        fetchData(URL_MOVIE_LIST)
            .then((data) => setGenres(data.genres))
            .catch((error) => console.error(error));
    }, []);

    return genres;
}

export function useLoadMovies() {
    const [movies, setMovies] = useState<MovieResponse | null>(null);
    const { state } = useFilterContext();

    useEffect(() => {
        let url = '';

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

        fetchData(url)
            .then((data: MovieResponse) => setMovies(data))
            .catch((error) => console.error('Ошибка при получении фильмов:', error));
    }, [state.sortBy, state.page]);

    return movies;
}

export function useLoadMovieInfo(movieId: string) {

    const [details, setDetails] = useState<MovieDetailsResponse>();
    const [credits, setCredits] = useState<CreditsResponse>();

    useEffect(() => {
            if (!movieId) return;

            const infoUrl = `${MOVIE_URL}${movieId}?language=ru`;
            const creditsUrl = `${MOVIE_URL}${movieId}/credits?language=ru`;

            fetchData(infoUrl)
                .then((data) => setDetails(data))
                .catch(console.error);

            fetchData(creditsUrl)
                .then((data) => setCredits(data))
                .catch(console.error);
        }, [movieId]);

        return { details, credits };
}

export function useAuth():AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Ошибка контекста аутентификация>");
    }
    return context;
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('Ошибка контекста модального окна');
    return context;
};