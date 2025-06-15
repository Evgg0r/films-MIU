import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle, ExitToApp} from "@mui/icons-material";
import {useAuth, useModal} from "../../hooks/hooks";


export function Header() {
    const {openModal} = useModal();
    const {token, logout} = useAuth();

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
                        {!token ? (
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
                            onClick={()=> logout()}
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