import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';

import type { AppDispatch, RootState } from '@/redux/store';
import { toggleFavoriteThunk } from '@/redux/thunks/toggleFavoriteMovie';

export const FavoriteButton = memo(({ movieId }: { movieId: number }) => {
    const favorites = useSelector((state: RootState) => state.movieFavorites.favorites);
    const dispatch: AppDispatch = useDispatch();
    const isFav = favorites.includes(movieId);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'error' | 'info'>('info');

    const handleClick = useCallback(
        async (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();

            try {
                await dispatch(toggleFavoriteThunk({ movieId, isFav }));
                setMessage(isFav ? 'Удалено из избранного' : 'Добавлено в избранное');
                setSeverity('info');
            } catch (error) {
                console.error('Ошибка при обновлении избранного:', error);
                setMessage('Ошибка: не удалось обновить избранное');
                setSeverity('error');
            } finally {
                setOpen(true);
            }
        },
        [movieId, isFav, dispatch],
    );

    return (
        <>
            <IconButton onClick={handleClick} color="error">
                {isFav ? <Star /> : <StarBorder />}
            </IconButton>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
});
