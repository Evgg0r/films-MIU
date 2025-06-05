import type {Dispatch, ReactNode} from "react";

export type Genre = {
    id: string,
    name: string,
}

export type FilterContextType = {
    state: FilterState;
    dispatch: Dispatch<FilterAction>;
};

export type FilterState = {
    sortBy: string,
    yearRange: [number, number],
    selectedGenres: string[],
    page: number,
}

export type FilterAction =
    | {type: 'setSortBy'; value: string}
    | {type: 'setYearRange'; value: [number, number]}
    | {type: 'setSelectedGenres'; value: string[]}
    | {type: 'setPage'; value: number}
    | {type: 'reset'};

export type FilterProviderProps = {
    children: ReactNode;
};

export type SortOptionType = {
    value: string;
    label: string;
};

export type SliderConfigType= {
    yearMax: number,
    yearMin: number,
    step: number,
    yearMarks: number[],
    yearRange: [number, number],
}

export type PaginationConfigType = {
    count: number,
    page: number,
}