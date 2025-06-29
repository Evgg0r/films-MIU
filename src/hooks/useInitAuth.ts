import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { login, setLoading } from '@/redux/slices/authSlice';
import type { AppDispatch } from '@/redux/store';

export function useInitAuth() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        const id = localStorage.getItem('user__id');

        if (token && id) {
            dispatch(login({ token, userId: Number(id) }));
        }

        dispatch(setLoading(false));
    }, []);
}
