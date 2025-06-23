import type {FilterAction, FilterState, ResetAction, SetPageAction, SetQueryAction, SetSelectedGenresAction, SetSortByAction, SetYearRangeAction} from "../../types/types.ts";
import {FILTER_INITIAL_STATE, RESET, SET_PAGE, SET_QUERY, SET_SELECTED_GENRES, SET_SORT_BY, SET_YEAR_RANGE} from "../../constants/constants.ts";

export function filterReducer(state : FilterState = FILTER_INITIAL_STATE, action: FilterAction) {
    switch (action.type) {
        case SET_SORT_BY:
            return {
                ...state, sortBy: action.payload
            }
        case SET_SELECTED_GENRES:
            return {
                ...state, selectedGenres: action.payload
            }
        case SET_YEAR_RANGE:
            return {
                ...state, yearRange: action.payload
            };
        case SET_PAGE:
            return {
                ...state, page: action.payload
            };
        case RESET:
            return FILTER_INITIAL_STATE
        case SET_QUERY:
            return {
                ...state, query: action.payload, page: 1
            }
        default:
            return state;
    }
}

export const setSortBy = (sortBy: string): SetSortByAction => ({
    type: SET_SORT_BY,
    payload: sortBy,
})

export const setSelectedGenres = (genres: string[]): SetSelectedGenresAction => ({
    type: SET_SELECTED_GENRES,
    payload: genres,
});

export const setYearRange = (range: [number, number]): SetYearRangeAction => ({
    type: SET_YEAR_RANGE,
    payload: range,
});

export const setPage = (page: number): SetPageAction => ({
    type: SET_PAGE,
    payload: page,
});

export const resetFilters = (): ResetAction => ({
    type: RESET,
});

export const setQuery = (query: string): SetQueryAction => ({
    type: SET_QUERY,
    payload: query,
});


