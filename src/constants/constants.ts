import type {FilterState, SliderConfigType, SortOptionType} from "../types/types";

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

export const INITIAL_STATE: FilterState = {
    sortBy: '',
    selectedGenres: [],
    yearRange: SLIDER_CONFIG.yearRange,
    page: 1,
    query: '',
}

export const PAGES_LIMIT: number = 500;
