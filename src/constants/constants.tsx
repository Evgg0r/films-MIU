import type {FilterState, PaginationConfigType, SliderConfigType, SortOptionType} from "../types/types.tsx";

export const SORT_OPTIONS: SortOptionType[] = [
    {value: "popular", label: "Популярности"},
    {value: "rating", label: "Рейтингу"},
    {value:"novelty", label: "Новизне"},
]

export const SLIDER_CONFIG: SliderConfigType = {
    yearMax: 2025,
    yearMin: 1960,
    step: 1,
    yearMarks: [1970, 1980, 1990, 2000, 2010, 2020],
    yearRange: [1980, 2020]
}

export const PAGINATION_CONFIG: PaginationConfigType = {
    count: 5,
    page: 1,
};

export const INITIAL_STATE: FilterState = {
    sortBy: '',
    selectedGenres: [],
    yearRange: SLIDER_CONFIG.yearRange,
    page: PAGINATION_CONFIG.page,
}