import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { isEmail } from 'validator';

import { MODAL_OPTIONS } from '@/constants';
import { closeModal, openModal } from '@/redux/slices/modalSlice';
import type { ModalProps } from '@/types';

export function RequestTokenModal({ open, onClose }: ModalProps) {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const handleChange = () => {
        if (!isEmail(email)) {
            setError(!isEmail(email));
            return;
        }
        setError(false);
        setEmail('');
        dispatch(openModal(MODAL_OPTIONS.enterToken));
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    elevation: 16,
                    sx: {
                        bgcolor: '#fff',
                        width: '444px',
                        height: '183px',
                        borderRadius: 2,
                        boxShadow: 24,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 500 }}>Запросить токен</DialogTitle>
                <DialogContent
                    sx={{
                        overflow: 'hidden',
                    }}
                >
                    <TextField
                        type="email"
                        label={'Почта'}
                        variant="standard"
                        sx={{
                            height: '47px',
                        }}
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={error}
                        helperText={error ? 'Введите корректный email' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setError(false);
                            setEmail('');
                            dispatch(closeModal());
                        }}
                        color="primary"
                    >
                        Отмена
                    </Button>
                    <Button onClick={handleChange} color="primary">
                        Запросить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
