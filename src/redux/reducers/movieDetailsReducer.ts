import {FETCH_MOVIE_INFO_FAILURE, FETCH_MOVIE_INFO_START, FETCH_MOVIE_INFO_SUCCESS, MOVIE_DETAILS_INITIAL_STATE} from "../../constants/constants";
import type {CreditsResponse, FetchMovieInfoFailureAction, FetchMovieInfoStartAction, FetchMovieInfoSuccessAction, MovieDetailsAction, MovieDetailsResponse, MovieDetailsState} from "../../types/types";

export function movieDetailsReducer(
    state = MOVIE_DETAILS_INITIAL_STATE,
    action: MovieDetailsAction
): MovieDetailsState {
    switch (action.type) {
        case FETCH_MOVIE_INFO_START:
            return { ...state, loading: true, error: null };
        case FETCH_MOVIE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                details: action.payload.details,
                credits: action.payload.credits
            };
        case FETCH_MOVIE_INFO_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const fetchMovieInfoStart = (): FetchMovieInfoStartAction => ({
    type: FETCH_MOVIE_INFO_START,
});

export const fetchMovieInfoSuccess = (
    details: MovieDetailsResponse,
    credits: CreditsResponse
): FetchMovieInfoSuccessAction => ({
    type: FETCH_MOVIE_INFO_SUCCESS,
    payload: { details, credits },
});

export const fetchMovieInfoFailure = (error: string): FetchMovieInfoFailureAction => ({
    type: FETCH_MOVIE_INFO_FAILURE,
    payload: error,
});