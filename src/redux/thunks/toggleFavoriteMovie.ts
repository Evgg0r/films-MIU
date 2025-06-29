import { createAsyncThunk } from '@reduxjs/toolkit';

import { mutateFavoriteFilm } from '@/components/FavoriteButton/mutateFavoriteFilm';
import { TOGGLE_FAVORITE_OPTIMISTIC, TOGGLE_FAVORITE_ROLLBACK } from '@/constants/constants';
import type { AppDispatch, RootState } from '@/redux/store';

export const toggleFavoriteThunk = createAsyncThunk<
    void,
    { movieId: number; isFav: boolean },
    { dispatch: AppDispatch; state: RootState }
>(
    'movieFavorites/toggleFavorite',
    async ({ movieId, isFav }, { dispatch, getState, rejectWithValue }) => {
        const userId = getState().auth.userId;
        if (!userId) return rejectWithValue('Нет userId');

        const url = `https://api.themoviedb.org/3/account/${userId}/favorite`;

        dispatch({
            type: TOGGLE_FAVORITE_OPTIMISTIC,
            payload: { movieId, isFav },
        });

        try {
            await mutateFavoriteFilm(url, {
                media_type: 'movie',
                media_id: movieId,
                favorite: !isFav,
            });
        } catch (error) {
            dispatch({
                type: TOGGLE_FAVORITE_ROLLBACK,
                payload: { movieId, isFav },
            });
            return rejectWithValue('Ошибка при обновлении избранного');
        }
    },
);
