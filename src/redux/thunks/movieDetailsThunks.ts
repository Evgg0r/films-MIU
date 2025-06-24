import {fetchData} from "../../api/fetch";
import type {AppDispatch} from "../../types/types";
import {fetchMovieInfoFailure, fetchMovieInfoStart, fetchMovieInfoSuccess} from "../reducers/movieDetailsReducer";
import {MOVIE_URL} from "../../constants/urls";

export const fetchMovieInfo = (movieId: string) => {
    return async (dispatch: AppDispatch) => {
        if (!movieId) return;

        dispatch(fetchMovieInfoStart());

        const infoUrl = `${MOVIE_URL}${movieId}?language=ru`;
        const creditsUrl = `${MOVIE_URL}${movieId}/credits?language=ru`;

        try {
            const [details, credits] = await Promise.all([
                fetchData(infoUrl),
                fetchData(creditsUrl)
            ]);

            dispatch(fetchMovieInfoSuccess(details, credits));
        } catch (error) {
            dispatch(fetchMovieInfoFailure("Ошибка загрузки данных о фильме"));
            console.error(error);
        }
    };
};