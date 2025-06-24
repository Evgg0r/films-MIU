import {FETCH_FAVORITES_FAILURE, FETCH_FAVORITES_START, FETCH_FAVORITES_SUCCESS, MOVIE_FAVORITES_INITIAL_STATE, TOGGLE_FAVORITE_OPTIMISTIC, TOGGLE_FAVORITE_ROLLBACK} from "../../constants/constants";
import type {FetchFavoritesFailureAction, FetchFavoritesStartAction, FetchFavoritesSuccessAction, MovieFavoritesAction, MovieFavoritesState} from "../../types/types.ts";

export function movieFavoritesReducer(
    state = MOVIE_FAVORITES_INITIAL_STATE,
    action: MovieFavoritesAction
): MovieFavoritesState {
    switch (action.type) {
        case FETCH_FAVORITES_START:
            return { ...state, loading: true, error: null };
        case FETCH_FAVORITES_SUCCESS:
            return { ...state, loading: false, favorites: action.payload };
        case FETCH_FAVORITES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case TOGGLE_FAVORITE_OPTIMISTIC: {
            const { movieId, isFav } = action.payload;
            return {
                ...state,
                favorites: isFav
                    ? state.favorites.filter((id) => id !== movieId)
                    : [...state.favorites, movieId],
            };
        }
        case TOGGLE_FAVORITE_ROLLBACK: {
            const { movieId, isFav } = action.payload;
            return {
                ...state,
                favorites: isFav
                    ? [...state.favorites, movieId]
                    : state.favorites.filter((id) => id !== movieId),
            };
        }
        default:
            return state;
    }
}

export const fetchFavoritesStart = (): FetchFavoritesStartAction => ({
    type: FETCH_FAVORITES_START,
});

export const fetchFavoritesSuccess = (favorites: number[]): FetchFavoritesSuccessAction => ({
    type: FETCH_FAVORITES_SUCCESS,
    payload: favorites,
});

export const fetchFavoritesFailure = (error: string): FetchFavoritesFailureAction => ({
    type: FETCH_FAVORITES_FAILURE,
    payload: error,
});

