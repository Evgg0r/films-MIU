import {fetchFavoritesFailure, fetchFavoritesStart, fetchFavoritesSuccess} from "../reducers/movieFavoritesReducer";
import type {AppDispatch} from "../../types/types";
import type {RootState} from "../store";
import {fetchData} from "../../api/fetch";

export const fetchMovieFavorites = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const userId = getState().auth.userId;
        if (!userId) return;

        const url = `https://api.themoviedb.org/3/account/${userId}/favorite/movies?language=ru&page=1&sort_by=created_at.asc`;

        dispatch(fetchFavoritesStart());

        try {
            const data = await fetchData(url);
            const favoriteIds = data.results.map((movie: { id: number }) => movie.id);
            dispatch(fetchFavoritesSuccess(favoriteIds));
        } catch (error) {
            console.error(error);
            dispatch(fetchFavoritesFailure("Ошибка загрузки избранных фильмов"));
        }
    };
};
