import {FETCH_MOVIES_FAILURE, FETCH_MOVIES_START, FETCH_MOVIES_SUCCESS, MOVIES_INITIAL_STATE} from "../../constants/constants";
import type {FetchMoviesFailureAction, FetchMoviesStartAction, FetchMoviesSuccessAction, MovieResponse, MoviesAction, MoviesState} from "../../types/types";

export function moviesReducer(
    state = MOVIES_INITIAL_STATE,
    action: MoviesAction
): MoviesState {
    switch (action.type) {
        case FETCH_MOVIES_START:
            return { ...state, loading: true, error: null };
        case FETCH_MOVIES_SUCCESS:
            return { ...state, loading: false, movies: action.payload };
        case FETCH_MOVIES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const fetchMoviesStart = (): FetchMoviesStartAction => ({
    type: FETCH_MOVIES_START,
});

export const fetchMoviesSuccess = (movies: MovieResponse): FetchMoviesSuccessAction => ({
    type: FETCH_MOVIES_SUCCESS,
    payload: movies,
});

export const fetchMoviesFailure = (error: string): FetchMoviesFailureAction => ({
    type: FETCH_MOVIES_FAILURE,
    payload: error,
});