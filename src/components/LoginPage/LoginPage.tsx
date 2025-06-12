import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";
import {RequestTokenModal} from "../RequestTokenModal/RequestTokenModal.tsx";


export function LoginPage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <Box display="flex" flexDirection={"column"} alignItems="center" >
                <Typography variant="h6" sx={{ mt: 8 }}>
                    Для доступа к фильмам необходимо авторизоватся.
                </Typography>
                <Button
                    sx={{mt: 4}}
                    variant="contained"
                    onClick={() => setIsLoginOpen(true)}
                >Войти
                </Button>
            </Box>
            <RequestTokenModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
        </>
    )
}