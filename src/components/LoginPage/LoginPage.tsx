import {Box, Button, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {openModal} from "../../redux/reducers/modalReducer.ts";


export function LoginPage() {
    const dispatch = useDispatch();

    return (
        <>
            <Box display="flex" flexDirection={"column"} alignItems="center" >
                <Typography variant="h6" sx={{ mt: 8 }}>
                    Для доступа к фильмам необходимо авторизоватся.
                </Typography>
                <Button
                    sx={{mt: 4}}
                    variant="contained"
                    onClick={() => dispatch(openModal('requestToken'))}
                >Войти
                </Button>
            </Box>
        </>
    )
}