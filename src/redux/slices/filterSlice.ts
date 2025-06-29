import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { FILTER_INITIAL_STATE } from '@/constants/constants.ts';

const filterSlice = createSlice({
    name: 'filter',
    initialState: FILTER_INITIAL_STATE,
    reducers: {
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        setSelectedGenres(state, action: PayloadAction<number[]>) {
            state.selectedGenres = action.payload;
        },
        setYearRange(state, action: PayloadAction<[number, number]>) {
            state.yearRange = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        resetFilters() {
            return FILTER_INITIAL_STATE;
        },
    },
});

export const filterReducer = filterSlice.reducer;
export const { setSortBy, setSelectedGenres, setYearRange, setPage, setQuery, resetFilters } =
    filterSlice.actions;
