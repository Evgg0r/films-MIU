import type {RootState} from "../store";
import type {AppDispatch} from "../../types/types";
import {fetchMoviesFailure, fetchMoviesStart, fetchMoviesSuccess} from "../reducers/moviesReducer";
import {fetchData} from "../../api/fetch";

export const fetchMovies = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState().filter;

        let url = "";

        if (state.query.trim()) {
            url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                state.query.trim()
            )}&language=ru&page=${state.page}`;
        } else {
            switch (state.sortBy) {
                case "popular":
                    url = `https://api.themoviedb.org/3/movie/popular?language=ru&page=${state.page}`;
                    break;
                case "rating":
                    url = `https://api.themoviedb.org/3/movie/top_rated?language=ru&page=${state.page}`;
                    break;
                default:
                    return;
            }
        }

        dispatch(fetchMoviesStart());

        try {
            const data = await fetchData(url);
            dispatch(fetchMoviesSuccess(data));
        } catch (error) {
            dispatch(fetchMoviesFailure("Ошибка при загрузке фильмов"));
        }
    };
};