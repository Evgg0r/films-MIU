import {Box, Button, Typography} from "@mui/material";
import {useModal} from "../../hooks/hooks";


export function LoginPage() {
    const {openModal} = useModal();

    return (
        <>
            <Box display="flex" flexDirection={"column"} alignItems="center" >
                <Typography variant="h6" sx={{ mt: 8 }}>
                    Для доступа к фильмам необходимо авторизоватся.
                </Typography>
                <Button
                    sx={{mt: 4}}
                    variant="contained"
                    onClick={() => openModal('requestToken')}
                >Войти
                </Button>
            </Box>
        </>
    )
}