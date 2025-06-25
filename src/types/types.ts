import type {Dispatch, ReactNode} from "react";
import {CLOSE_MODAL, FETCH_FAVORITES_FAILURE, FETCH_FAVORITES_START, FETCH_FAVORITES_SUCCESS, FETCH_GENRES_FAILURE, FETCH_GENRES_START, FETCH_GENRES_SUCCESS, FETCH_MOVIE_INFO_FAILURE, FETCH_MOVIE_INFO_START, FETCH_MOVIE_INFO_SUCCESS, FETCH_MOVIES_FAILURE, FETCH_MOVIES_START, FETCH_MOVIES_SUCCESS, LOGIN, LOGOUT, MODAL_OPTIONS, OPEN_MODAL, RESET, SET_LOADING, SET_PAGE, SET_QUERY, SET_SELECTED_GENRES, SET_SORT_BY, SET_YEAR_RANGE, TOGGLE_FAVORITE_OPTIMISTIC, TOGGLE_FAVORITE_ROLLBACK} from "../constants/constants";

export type Genre = {
    id: string,
    name: string,
}

export type FilterContextType = {
    state: FilterState;
    dispatch: Dispatch<FilterActionCont>;
};

export type FilterState = {
    sortBy: string,
    yearRange: [number, number],
    selectedGenres: string[],
    page: number,
    query: string,
}

export type FilterActionCont =
    | {type: 'setSortBy'; value: string}
    | {type: 'setYearRange'; value: [number, number]}
    | {type: 'setSelectedGenres'; value: string[]}
    | {type: 'setPage'; value: number}
    | {type: 'reset'}
    | { type: 'setQuery'; value: string };

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
    movieIdValue: number;
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
    login: (token: string, id: number) => void;
    logout: () => void;
    loading: boolean;
    userId: number | null;
};

export type FavoriteRequestBody = {
    media_type: string;
    media_id: number;
    favorite: boolean;
}

export type FavoriteMoviesResponse = {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
};
export type ModalKey = keyof typeof MODAL_OPTIONS;

export type ModalType = typeof MODAL_OPTIONS[ModalKey] | null;

export type ModalContextType = {
    openModal: (type: ModalKey) => void;
    closeModal: () => void;
    currentModal: ModalType;
};

export type AuthState = {
    token: string | null;
    userId: number | null;
    loading: boolean;
};

export type LoginAction = {
    type: typeof LOGIN;
    payload: {
        token: string;
        userId: number;
    };
}

export type LogoutAction = {
    type: typeof LOGOUT;
}

export type SetLoadingAction  = {
    type: typeof SET_LOADING;
    payload: boolean;
}

export type AuthAction = LoginAction | LogoutAction | SetLoadingAction;

export type ModalState = {
    currentModal: ModalType;
};

export type OpenAction = {
   type: typeof OPEN_MODAL;
    payload: ModalType;
};

export type CloseAction = {
    type: typeof CLOSE_MODAL;
};

export type ModalAction = OpenAction | CloseAction;

export type SetSortByAction = {
    type: typeof SET_SORT_BY;
    payload: string
}

export type SetYearRangeAction = {
    type: typeof SET_YEAR_RANGE;
    payload: [number, number]
}

export type SetSelectedGenresAction = {
    type: typeof SET_SELECTED_GENRES;
    payload: string[]
}

export type SetPageAction = {
    type: typeof SET_PAGE;
    payload: number
}

export type ResetAction = {
    type: typeof RESET
}

export type SetQueryAction = {
    type: typeof SET_QUERY; payload: string
}

export type FilterAction = SetSortByAction | SetYearRangeAction | SetSelectedGenresAction | SetPageAction | ResetAction | SetQueryAction;

export type GenresState = {
    genres: Genre[];
    loading: boolean;
    error: string | null;
};


export type FetchGenresStartAction = {
    type: typeof FETCH_GENRES_START;
};

export type FetchGenresSuccessAction = {
    type: typeof FETCH_GENRES_SUCCESS;
    payload: Genre[];
};

export type FetchGenresFailureAction = {
    type: typeof FETCH_GENRES_FAILURE;
    payload: string;
};

export type GenresAction =  FetchGenresStartAction | FetchGenresSuccessAction | FetchGenresFailureAction;


export type MoviesState = {
    movies: MovieResponse | null;
    loading: boolean;
    error: string | null;
};

export type FetchMoviesStartAction = {
    type: typeof FETCH_MOVIES_START;
};

export type FetchMoviesSuccessAction = {
    type: typeof FETCH_MOVIES_SUCCESS;
    payload: MovieResponse;
};

export type FetchMoviesFailureAction = {
    type: typeof FETCH_MOVIES_FAILURE;
    payload: string;
};

export type MoviesAction = FetchMoviesStartAction | FetchMoviesSuccessAction | FetchMoviesFailureAction;

export type MovieDetailsState = {
    details: MovieDetailsResponse | null;
    credits: CreditsResponse | null;
    loading: boolean;
    error: string | null;
};

export type FetchMovieInfoStartAction = {
    type: typeof FETCH_MOVIE_INFO_START;
};

export type FetchMovieInfoSuccessAction = {
    type: typeof FETCH_MOVIE_INFO_SUCCESS;
    payload: {
        details: MovieDetailsResponse;
        credits: CreditsResponse;
    };
};

export type FetchMovieInfoFailureAction = {
    type: typeof FETCH_MOVIE_INFO_FAILURE;
    payload: string;
};

export type MovieDetailsAction = FetchMovieInfoStartAction | FetchMovieInfoSuccessAction | FetchMovieInfoFailureAction;

export type MovieFavoritesState = {
    favorites: number[];         // ID избранных фильмов
    loading: boolean;
    error: string | null;
};

export type FetchFavoritesStartAction = {
    type: typeof FETCH_FAVORITES_START;
};

export type FetchFavoritesSuccessAction = {
    type: typeof FETCH_FAVORITES_SUCCESS;
    payload: number[];
};

export type FetchFavoritesFailureAction = {
    type: typeof FETCH_FAVORITES_FAILURE;
    payload: string;
};


export type ToggleFavoriteOptimisticAction = {
    type: typeof TOGGLE_FAVORITE_OPTIMISTIC;
    payload: {
        movieId: number;
        isFav: boolean;
    };
};

export type ToggleFavoriteRollbackAction = {
    type: typeof TOGGLE_FAVORITE_ROLLBACK;
    payload: {
        movieId: number;
        isFav: boolean;
    };
};

export type MovieFavoritesAction = FetchFavoritesStartAction | FetchFavoritesSuccessAction | FetchFavoritesFailureAction | ToggleFavoriteOptimisticAction | ToggleFavoriteRollbackAction;
