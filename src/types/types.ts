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

export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type MovieCardProps = {
    movie: Movie;
};

export type FiltersProps = {
    totalPages: number;
}

export type CastPerson = {
    id: number;
    name: string;
}

export type CrewPerson = {
    id: number;
    name: string;
    job: string;
}

export type CreditsResponse = {
    id: number;
    cast: CastPerson[];
    crew: CrewPerson[];
}

export type MovieDetailsResponse = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    budget: number;
    genres: { id: number; name: string }[];
    production_countries: { name: string }[];
}

type InfoItem = {
    label: string;
    value: string;
};

export type movieDetailsProps = {
    movieDetails: InfoItem[];
};

export type MovieActorsInfoProps = {
    castActors: CastPerson[];
};

export type MovieTitleInfoProps = {
    movieTitle: string;
    movieYear: string;
};

export type MoviePosterProps = {
    movieTitle: string;
    urlPoster: string;
}

export type ModalProps = {
    open: boolean;
    onClose: () => void;
};

export type AuthContextType = {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
};