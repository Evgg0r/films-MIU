import {fetchData} from "../../api/fetch";
import {fetchGenresFailure, fetchGenresStart, fetchGenresSuccess} from "../reducers/genresReducer";
import {URL_MOVIE_LIST} from "../../constants/urls";
import type {AppDispatch} from "../../types/types";

export const fetchGenres = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchGenresStart());

        try {
            const data = await fetchData(URL_MOVIE_LIST);
            dispatch(fetchGenresSuccess(data.genres));
        } catch (error) {
            dispatch(fetchGenresFailure("Ошибка при загрузке жанров"));
        }
    };
};