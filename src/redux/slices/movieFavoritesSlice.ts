import { createSlice } from '@reduxjs/toolkit';

import { MOVIE_FAVORITES_INITIAL_STATE } from '@/constants/constants.ts';
import { fetchMovieFavorites } from '@/redux/thunks/movieFavoritesThunks';

const movieFavoritesSlice = createSlice({
    name: 'movieFavorites',
    initialState: MOVIE_FAVORITES_INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(fetchMovieFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === 'string'
                        ? action.payload
                        : (action.error.message ?? 'Неизвестная ошибка');
            });
    },
});

export const movieFavoritesReducer = movieFavoritesSlice.reducer;
