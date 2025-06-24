import type {AuthState, FilterState, ModalState, SliderConfigType, SortOptionType} from "../types/types";


export const SORT_OPTIONS: SortOptionType[] = [
    {value: "popular", label: "Популярности"},
    {value: "rating", label: "Рейтингу"},
]

export const SLIDER_CONFIG: SliderConfigType = {
    yearMax: 2025,
    yearMin: 1960,
    step: 1,
    yearMarks: [1970, 1980, 1990, 2000, 2010, 2020],
    yearRange: [1980, 2020]
}

export const FILTER_INITIAL_STATE: FilterState = {
    sortBy: '',
    selectedGenres: [],
    yearRange: SLIDER_CONFIG.yearRange,
    page: 1,
    query: '',
}

export const PAGES_LIMIT: number = 500;

export const AUTH_INITIAL_STATE: AuthState = {
    token: null,
    userId: null,
    loading: true,
};

export const MODAL_OPTIONS = {
    enterToken: 'enterToken',
    requestToken: 'requestToken',
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_LOADING = "SET_LOADING";

export const MODAL_INITIAL_STATE: ModalState = {
    currentModal: null,
};

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SELECTED_GENRES = 'SET_SELECTED_GENRES';
export const SET_YEAR_RANGE = 'SET_YEAR_RANGE';
export const SET_PAGE = 'SET_PAGE';
export const RESET = 'RESET';
export const SET_QUERY = 'SET_QUERY';

export const GENRES_INITIAL_STATE = {
    genres: [],
    loading: false,
    error: null,
};

export const FETCH_GENRES_START = 'FETCH_GENRES_START';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS'
export const FETCH_GENRES_FAILURE = 'FETCH_GENRES_FAILURE';

export const MOVIES_INITIAL_STATE = {
    movies: null,
    loading: false,
    error: null
};

export const FETCH_MOVIES_START = "FETCH_MOVIES_START";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

export const MOVIE_DETAILS_INITIAL_STATE = {
    details: null,
    credits: null,
    loading: false,
    error: null
};

export const FETCH_MOVIE_INFO_START = "FETCH_MOVIE_INFO_START";
export const FETCH_MOVIE_INFO_SUCCESS = "FETCH_MOVIE_INFO_SUCCESS";
export const FETCH_MOVIE_INFO_FAILURE = "FETCH_MOVIE_INFO_FAILURE";

export const MOVIE_FAVORITES_INITIAL_STATE = {
    favorites: [],
    loading: false,
    error: null,
};

export const FETCH_FAVORITES_START = "FETCH_FAVORITES_START";
export const FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS";
export const FETCH_FAVORITES_FAILURE = "FETCH_FAVORITES_FAILURE";

export const TOGGLE_FAVORITE_OPTIMISTIC = "TOGGLE_FAVORITE_OPTIMISTIC";
export const TOGGLE_FAVORITE_ROLLBACK = "TOGGLE_FAVORITE_ROLLBACK";