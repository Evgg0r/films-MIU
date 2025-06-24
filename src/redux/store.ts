import {createStore, combineReducers, applyMiddleware} from 'redux';
import  {thunk} from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {modalReducer} from "./reducers/modalReducer";
import {filterReducer} from "./reducers/filterReducer.ts";
import {genresReducer} from "./reducers/genresReducer.ts";
import {moviesReducer} from "./reducers/moviesReducer.ts";
import {movieDetailsReducer} from "./reducers/movieDetailsReducer.ts";
import {movieFavoritesReducer} from "./reducers/movieFavoritesReducer.ts";

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    filter: filterReducer,
    genres: genresReducer,
    movies: moviesReducer,
    moviesDetails: movieDetailsReducer,
    movieFavorites: movieFavoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk));