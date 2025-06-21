import {Snackbar, Alert, IconButton} from '@mui/material';
import {memo, useCallback, useState} from 'react';
import {useMovieFavorites, useToggleFavoriteMovie} from '../../hooks/hooks.tsx';
import {Star,StarBorder} from "@mui/icons-material";

export const FavoriteButton = memo(({movieId}: { movieId: number })=> {
    const { favorites, setFavorites } = useMovieFavorites();
    const {toggleFavorite} = useToggleFavoriteMovie(favorites, setFavorites);
    const isFav = favorites.includes(movieId);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<"error" | "info">("info");

    const handleClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            await toggleFavorite(movieId, isFav);
            setMessage(isFav ? "Удалено из избранного" : "Добавлено в избранное");
            setSeverity("info");
        } catch (error) {
            console.error("Ошибка при обновлении избранного:", error);
            setMessage("Ошибка: не удалось обновить избранное");
            setSeverity("error");
        } finally {
            setOpen(true);
        }
    }, [movieId, isFav, toggleFavorite]);

    return (
        <>
            <IconButton onClick={handleClick} color="error">
                {isFav ? <Star/> : <StarBorder/>}
            </IconButton>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
})