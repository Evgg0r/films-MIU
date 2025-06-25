import { configureStore } from "@reduxjs/toolkit";
import { genresReducerRTK } from "./slices/genresSlice.ts";
import {authReducerRTK} from "./slices/authSlice.ts";
import {modalReducerRTK} from "./slices/modalSlice.ts";
import {filterReducerRTK} from "./slices/filterSlice.ts";
import {moviesReducerRTK} from "./slices/moviesSlice.ts";
import {movieDetailsReducerRTK} from "./slices/movieDetailsSlice.ts";
import {movieFavoritesReducerRTK} from "./slices/movieFavoritesSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducerRTK,
        modal: modalReducerRTK,
        filter: filterReducerRTK,
        genres: genresReducerRTK,
        movies: moviesReducerRTK,
        moviesDetails: movieDetailsReducerRTK,
        movieFavorites: movieFavoritesReducerRTK,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// код для примера Redux
// const rootReducer = combineReducers({
//     auth: authReducer,
//     modal: modalReducer,
//     filter: filterReducer,
//     genres: genresReducer,
//     movies: moviesReducer,
//     moviesDetails: movieDetailsReducer,
//     movieFavorites: movieFavoritesReducer,
// });
//
// export type RootState = ReturnType<typeof rootReducer>;
//
// export const store = createStore(
//     rootReducer,
//     undefined,
//     applyMiddleware(thunk));