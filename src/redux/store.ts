import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@/redux/slices/authSlice';
import { filterReducer } from '@/redux/slices/filterSlice';
import { genresReducer } from '@/redux/slices/genresSlice';
import { modalReducer } from '@/redux/slices/modalSlice';
import { movieFavoritesReducer } from '@/redux/slices/movieFavoritesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        filter: filterReducer,
        genres: genresReducer,
        movieFavorites: movieFavoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
