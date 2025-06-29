import type { AuthState, FilterState, SliderConfigType, SortOptionType } from '@/types';

export const SORT_OPTIONS: SortOptionType[] = [
    { value: 'popular', label: 'Популярности' },
    { value: 'rating', label: 'Рейтингу' },
];

export const SLIDER_CONFIG: SliderConfigType = {
    yearMax: 2025,
    yearMin: 1960,
    step: 1,
    yearMarks: [1970, 1980, 1990, 2000, 2010, 2020],
    yearRange: [1980, 2020],
};

export const FILTER_INITIAL_STATE: FilterState = {
    sortBy: '',
    selectedGenres: [],
    yearRange: SLIDER_CONFIG.yearRange,
    page: 1,
    query: '',
};

export const PAGES_LIMIT: number = 500;

export const AUTH_INITIAL_STATE: AuthState = {
    token: null,
    userId: null,
    loading: true,
};

export const MODAL_OPTIONS = {
    enterToken: 'enterToken',
    requestToken: 'requestToken',
};

export const MODAL_INITIAL_STATE = {
    currentModal: null,
};

export const GENRES_INITIAL_STATE = {
    genres: [],
    loading: false,
    error: null,
};

export const MOVIE_FAVORITES_INITIAL_STATE = {
    favorites: [],
    loading: false,
    error: null,
};

export const TOGGLE_FAVORITE_OPTIMISTIC = 'TOGGLE_FAVORITE_OPTIMISTIC';
export const TOGGLE_FAVORITE_ROLLBACK = 'TOGGLE_FAVORITE_ROLLBACK';
