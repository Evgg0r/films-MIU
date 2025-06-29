import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

import { MODAL_OPTIONS } from '@/constants/constants';
import { openModal } from '@/redux/slices/modalSlice';

export function LoginPage() {
    const dispatch = useDispatch();

    return (
        <>
            <Box display="flex" flexDirection={'column'} alignItems="center">
                <Typography variant="h6" sx={{ mt: 8 }}>
                    Для доступа к фильмам необходимо авторизоватся.
                </Typography>
                <Button
                    sx={{ mt: 4 }}
                    variant="contained"
                    onClick={() => dispatch(openModal(MODAL_OPTIONS.requestToken))}
                >
                    Войти
                </Button>
            </Box>
        </>
    );
}
