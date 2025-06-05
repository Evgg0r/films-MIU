import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export function EnterTokenDialog() {
    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState('');

    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        console.log('Email:', email);
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
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
