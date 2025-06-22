import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle, ExitToApp} from "@mui/icons-material";
import {useModal} from "../../hooks/hooks";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store";
import {logout} from "../../redux/reducers/authReducer";


export function Header() {
    const {openModal} = useModal();
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();


    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Typography
                        variant="h6"
                        component="div">
                        Фильмы
                    </Typography>
                    <Box>
                        {!auth.token ? (
                            <IconButton
                            size="large"
                            color="inherit"
                            aria-label="account of current user"
                            onClick={() => openModal('requestToken')}
                        >
                            <AccountCircle/>
                        </IconButton>
                            )
                        : (
                            <IconButton
                            size="large"
                            color="inherit"
                            aria-label="account exit"
                            onClick={() => dispatch(logout())}
                        >
                            <ExitToApp/>
                        </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}