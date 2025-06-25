import {fetchMovieDetails} from "../thunks/movieDetailsThunks.ts";
import {createSlice} from "@reduxjs/toolkit";
import {MOVIE_DETAILS_INITIAL_STATE} from "../../constants/constants.ts";

const movieDetailsSlice = createSlice({
    name: "movieDetails",
    initialState: MOVIE_DETAILS_INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload.details;
                state.credits = action.payload.credits;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Ошибка загрузки деталей";
            });
    },
});

export const movieDetailsReducerRTK = movieDetailsSlice.reducer;