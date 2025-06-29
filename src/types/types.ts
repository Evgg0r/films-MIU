import { MODAL_OPTIONS } from '@/constants/constants';

export type Genre = {
    id: number;
    name: string;
};

export type FilterState = {
    sortBy: string;
    yearRange: [number, number];
    selectedGenres: number[];
    page: number;
    query: string;
};

export type SortOptionType = {
    value: string;
    label: string;
};

export type SliderConfigType = {
    yearMax: number;
    yearMin: number;
    step: number;
    yearMarks: number[];
    yearRange: [number, number];
};

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
};

export type CastPerson = {
    id: number;
    name: string;
};

export type CrewPerson = {
    id: number;
    name: string;
    job: string;
};

export type CreditsResponse = {
    id: number;
    cast: CastPerson[];
    crew: CrewPerson[];
};

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
};

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
    movieIdValue: number;
};

export type MoviePosterProps = {
    movieTitle: string;
    urlPoster: string;
};

export type ModalProps = {
    open: boolean;
    onClose: () => void;
};

export type FavoriteRequestBody = {
    media_type: string;
    media_id: number;
    favorite: boolean;
};

export type ModalKey = keyof typeof MODAL_OPTIONS;

export type ModalType = (typeof MODAL_OPTIONS)[ModalKey] | null;

export type AuthState = {
    token: string | null;
    userId: number | null;
    loading: boolean;
};
