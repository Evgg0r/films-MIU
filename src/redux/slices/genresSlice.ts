import {createSlice} from "@reduxjs/toolkit";
import {GENRES_INITIAL_STATE} from "../../constants/constants.ts";
import {fetchGenres} from "../thunks/genresThunks.ts";

const genresSlice = createSlice({
    name: 'genres',
    initialState: GENRES_INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Ошибка загрузки жанров';
            });
    },
});

export const genresReducerRTK = genresSlice.reducer;