import {useContext, useEffect, useState} from "react";
import {FilterContext} from "../Context/FilterContext";
import type {
    AppDispatch,
    AuthContextType,
    CreditsResponse,
    FavoriteMoviesResponse,
    FilterContextType,
    Genre,
    MovieDetailsResponse,
    MovieResponse
} from "../types/types";
import {AuthContext} from "../Context/AuthContext";
import {fetchData} from "../api/fetch";
import {MOVIE_URL, URL_MOVIE_LIST, URL_POPULAR_LIST, URL_TOP_RATED_LIST} from "../constants/urls";
import {ModalContext} from "../Context/ModalContext";
import {mutateFavoriteFilm} from "../components/FavoriteButton/mutateFavoriteFilm";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../redux/store";
import {login, setLoading} from "../redux/reducers/authReducer";
import {fetchGenres} from "../redux/thunks/genresThunks";
import {fetchMovies} from "../redux/thunks/moviesThunks";
import {fetchMovieInfo} from "../redux/thunks/movieDetailsThunks";
import {fetchMovieFavorites} from "../redux/thunks/movieFavoritesThunks";


export function useFilterContext(): FilterContextType {
    return useContext(FilterContext);
}

export function useLoadGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        fetchData(URL_MOVIE_LIST)
            .then((data) => setGenres(data.genres))
            .catch((error) => console.error(error));
    }, []);

    return genres;
}

export function useLoadMovies() {
    const [movies, setMovies] = useState<MovieResponse | null>(null);
    const state = useSelector((state: RootState) => state.filter);;

    useEffect(() => {
        let url = '';

        if (state.query.trim()) {
            url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(state.query.trim())}&language=ru&page=${state.page}`;
        } else {
            switch (state.sortBy) {
                case 'popular':
                    url = `${URL_POPULAR_LIST}${state.page}`;
                    break;
                case 'rating':
                    url = `${URL_TOP_RATED_LIST}${state.page}`;
                    break;
                default:
                    return;
            }
        }

        fetchData(url)
            .then((data: MovieResponse) => setMovies(data))
            .catch((error) => console.error('Ошибка при получении фильмов:', error));
    }, [state.sortBy, state.page, state.query]);

    return movies;
}

export function useLoadMovieInfo(movieId: string) {

    const [details, setDetails] = useState<MovieDetailsResponse>();
    const [credits, setCredits] = useState<CreditsResponse>();

    useEffect(() => {
            if (!movieId) return;

            const infoUrl = `${MOVIE_URL}${movieId}?language=ru`;
            const creditsUrl = `${MOVIE_URL}${movieId}/credits?language=ru`;

            fetchData(infoUrl)
                .then((data) => setDetails(data))
                .catch(console.error);

            fetchData(creditsUrl)
                .then((data) => setCredits(data))
                .catch(console.error);
        }, [movieId]);

        return { details, credits };
}

export function useAuth():AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Ошибка контекста аутентификация>");
    }
    return context;
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('Ошибка контекста модального окна');
    return context;
};

export const useMovieFavorites = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const userId = auth.userId;
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/account/${userId}/favorite/movies?language=ru&page=1&sort_by=created_at.asc`;
        fetchData(url)
            .then((data: FavoriteMoviesResponse) =>
                setFavorites(data.results.map((movie) => movie.id))
            )
            .catch(console.error);
    }, [userId]);

    return { favorites, setFavorites };
};

export const useToggleFavoriteMovie = (
    _favorites: number[],
    setFavorites: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const auth = useSelector((state: RootState) => state.auth);
    const userId = auth.userId;

    const toggleFavorite = async (movieId: number, isFav: boolean) => {
        const url = `https://api.themoviedb.org/3/account/${userId}/favorite`;

        setFavorites((prev) =>
            isFav ? prev.filter((id) => id !== movieId) : [...prev, movieId]
        );

        try {
            await mutateFavoriteFilm(url, {
                media_type: "movie",
                media_id: movieId,
                favorite: !isFav,
            });
        } catch (error) {
            setFavorites((prev) =>
                isFav ? [...prev, movieId] : prev.filter((id) => id !== movieId)
            );
            console.error("Ошибка при обновлении избранного:", error);
            throw error;
        }
    };

    return { toggleFavorite };
};

//  Вышеуказаные хухи используют контекст

export function useInitAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        const id = localStorage.getItem("user__id");

        if (token && id) {
            dispatch(login(token, Number(id)));
        }

        dispatch(setLoading(false));
    }, []);
}

export function useInitGenres() {
    const dispatch: AppDispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchGenres());
        }
    }, [dispatch]);
}

export function useInitMovies() {
    const dispatch: AppDispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.filter);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch, filter.query, filter.sortBy, filter.page]);
}

export function useInitMovieInfo(movieId: string) {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieInfo(movieId));
        }
    }, [dispatch, movieId]);
}

export function useInitFavorites() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieFavorites());
    }, [dispatch]);
}