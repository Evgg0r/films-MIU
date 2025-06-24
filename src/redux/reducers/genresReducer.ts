import {FETCH_GENRES_FAILURE, FETCH_GENRES_START, FETCH_GENRES_SUCCESS, GENRES_INITIAL_STATE} from "../../constants/constants";
import type {FetchGenresFailureAction, FetchGenresStartAction, FetchGenresSuccessAction, Genre, GenresAction, GenresState} from "../../types/types";

export function genresReducer(state = GENRES_INITIAL_STATE, action: GenresAction): GenresState {
    switch (action.type) {
        case FETCH_GENRES_START:
            return { ...state, loading: true, error: null };
        case FETCH_GENRES_SUCCESS:
            return { ...state, loading: false, genres: action.payload };
        case FETCH_GENRES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const fetchGenresStart = ():FetchGenresStartAction => ({
    type: FETCH_GENRES_START,
});

export const fetchGenresSuccess = (genres: Genre[]):FetchGenresSuccessAction => ({
    type: FETCH_GENRES_SUCCESS,
    payload: genres,
});

export const fetchGenresFailure = (error: string): FetchGenresFailureAction => ({
    type: FETCH_GENRES_FAILURE,
    payload: error,
});