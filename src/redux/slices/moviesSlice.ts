import {MOVIES_INITIAL_STATE} from "../../constants/constants.ts";
import {createSlice} from "@reduxjs/toolkit";
import {fetchMovies} from "../thunks/moviesThunks.ts";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: MOVIES_INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Ошибка загрузки фильмов';
            });
    },
});

export const moviesReducerRTK = moviesSlice.reducer;