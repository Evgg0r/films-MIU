import {useContext, useEffect, useState} from "react";
import {FilterContext} from "../Context/FilterContext.tsx";
import type {CreditsResponse, FilterContextType, Genre, MovieDetailsResponse, MovieResponse} from "../types/types.ts";
import {UserContext} from "../Context/UserContext.tsx";
import {fetchData} from "../api/fetch.tsx";
import {MOVIE_URL, URL_MOVIE_LIST, URL_POPULAR_LIST, URL_TOP_RATED_LIST} from "../constants/urls.ts";

export function useFilterContext(): FilterContextType {
    return useContext(FilterContext);
}

export function useLoadGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const userToken = useContext(UserContext);

    useEffect(() => {
        fetchData(URL_MOVIE_LIST, userToken)
            .then((data) => setGenres(data.genres))
            .catch((error) => console.error(error));
    }, [userToken]);

    return genres;
}

export function useLoadMovies() {
    const [movies, setMovies] = useState<MovieResponse | null>(null);
    const { state } = useFilterContext();
    const userToken = useContext(UserContext);

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

        fetchData(url, userToken)
            .then((data: MovieResponse) => setMovies(data))
            .catch((error) => console.error('Ошибка при получении фильмов:', error));
    }, [state.sortBy, state.page, userToken]);

    return movies;
}

export function useLoadMovieInfo(movieId?: string) {
    const [details, setDetails] = useState<MovieDetailsResponse | null>(null);
    const [credits, setCredits] = useState<CreditsResponse | null>(null);
    const userToken = useContext(UserContext);

    useEffect(() => {
            if (!movieId) return;

            const infoUrl = `${MOVIE_URL}${movieId}?language=ru`;
            const creditsUrl = `${MOVIE_URL}${movieId}/credits?language=ru`;

            fetchData(infoUrl, userToken)
                .then((data) => setDetails(data))
                .catch(console.error);

            fetchData(creditsUrl, userToken)
                .then((data) => setCredits(data))
                .catch(console.error);
        }, [movieId, userToken]);

        return { details, credits };
}