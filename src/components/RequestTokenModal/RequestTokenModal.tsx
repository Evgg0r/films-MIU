import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import type {ModalProps} from "../../types/types";
import { isEmail } from 'validator';
import {useModal} from "../../hooks/hooks";

export function RequestTokenModal({open, onClose}: ModalProps) {
    const [email, setEmail] = useState('');
    const {openModal} = useModal();
    const [error, setError] = useState(false);

    const handleChange = () => {
        if (!isEmail(email)) {
            setError(!isEmail(email));
            return;
        }
        setError(false);
        setEmail("");
        openModal('enterToken')
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
                }}>
                <DialogTitle sx={{fontWeight: 500}}>Запросить токен</DialogTitle>
                <DialogContent sx={{
                    overflow: 'hidden'
                }}>
                    <TextField
                        type="email"
                        label={'Почта'}
                        variant="standard"
                        sx={{
                            height: '47px'
                        }}
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={error}
                        helperText={error ? "Введите корректный email" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setError(false);
                            setEmail('');
                            onClose();
                        }}
                        color="primary"
                    >Отмена</Button>
                    <Button
                        onClick={handleChange}
                        color="primary"
                    >Запросить</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
