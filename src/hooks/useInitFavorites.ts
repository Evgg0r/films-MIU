import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/redux/store';
import { fetchMovieFavorites } from '@/redux/thunks/movieFavoritesThunks';

export function useInitFavorites() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieFavorites());
    }, [dispatch]);
}
