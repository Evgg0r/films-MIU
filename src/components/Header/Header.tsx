import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle, ExitToApp} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/store";
import {logout} from "../../redux/slices/authSlice.ts";
import {openModal} from "../../redux/slices/modalSlice.ts";
import {MODAL_OPTIONS} from "../../constants/constants.ts";


export function Header() {
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
                            onClick={() => dispatch(openModal(MODAL_OPTIONS.requestToken))}
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