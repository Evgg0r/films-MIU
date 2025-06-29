import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { AUTH_INITIAL_STATE } from '@/constants/constants';

const authSlice = createSlice({
    name: 'auth',
    initialState: AUTH_INITIAL_STATE,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; userId: number }>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.loading = false;
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;

export const { login, logout, setLoading } = authSlice.actions;
