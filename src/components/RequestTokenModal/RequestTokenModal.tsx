import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import type {ModalProps} from "../../types/types.ts";
import {EnterTokenModal} from "../EnterTokenModal/EnterTokenModal.tsx";
import { isEmail } from 'validator';

export function RequestTokenModal({open, onClose}: ModalProps) {
    const [email, setEmail] = useState('');
    const [isEnterOpen, setIsEnterOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = () => {
        if (!isEmail(email)) {
            setError(!isEmail(email));
            return;
        }
        setError(false);
        setEmail("");
        onClose()
        setIsEnterOpen(true)
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
            <EnterTokenModal open={isEnterOpen} onClose={() => setIsEnterOpen(false)}/>
        </>
    )
}
