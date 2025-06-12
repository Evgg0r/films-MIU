import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import type {ModalProps} from "../../types/types";
import {useAuth} from "../../hooks/hooks";
import {HARD_CODED_TOKEN} from "../../constants/urls.ts";

export function EnterTokenModal({open, onClose}: ModalProps) {
    const [token, setToken] = useState("");
    const {login} = useAuth();
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (token.trim().length < 10) {
            setError(true);
            return;
        }
        setError(true);
        login(HARD_CODED_TOKEN); // ВРЕМЕННО: пока не подключена реальная отправка на почту — токен захардкожен
        onClose();
    };


    return (
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
            <DialogTitle sx={{fontWeight: 500}}>Введите токен</DialogTitle>
            <DialogContent sx={{
                overflow: 'hidden'
            }}>
                <TextField
                    label={'ТОКЕН'}
                    variant="standard"
                    sx={{
                        height: '47px'
                    }}
                    fullWidth
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    error={error}
                    helperText={error ? "Токен слишком короткий (минимум 10 символов)" : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        setError(false);
                        setToken('');
                        onClose
                    }}
                    color="primary"
                >Отмена</Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                >Ок</Button>
            </DialogActions>
        </Dialog>
    )
}
