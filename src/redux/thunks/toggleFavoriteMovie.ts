import {TOGGLE_FAVORITE_OPTIMISTIC, TOGGLE_FAVORITE_ROLLBACK} from "../../constants/constants";
import type {AppDispatch} from "../../types/types";
import type {RootState} from "../store";
import {mutateFavoriteFilm} from "../../components/FavoriteButton/mutateFavoriteFilm";

export const toggleFavoriteThunk = (movieId: number, isFav: boolean) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const userId = getState().auth.userId;
        if (!userId) return;

        const url = `https://api.themoviedb.org/3/account/${userId}/favorite`;

        dispatch({
            type: TOGGLE_FAVORITE_OPTIMISTIC,
            payload: { movieId, isFav },
        });

        try {
            await mutateFavoriteFilm(url, {
                media_type: "movie",
                media_id: movieId,
                favorite: !isFav,
            });
        } catch (error) {
            dispatch({
                type: TOGGLE_FAVORITE_ROLLBACK,
                payload: { movieId, isFav },
            });
            throw error;
        }
    };
};