import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/redux/store';
import { fetchGenres } from '@/redux/thunks/genresThunks';

export function useInitGenres() {
    const dispatch: AppDispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchGenres());
        }
    }, [dispatch, token]);
}
