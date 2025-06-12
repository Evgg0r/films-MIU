import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle, ExitToApp} from "@mui/icons-material";
import {useState} from "react";
import {RequestTokenModal} from "../RequestTokenModal/RequestTokenModal.tsx";
import {useAuth} from "../../hooks/hooks.tsx";


export function Header() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
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
                            onClick={() => setIsLoginOpen(true)}
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
            <RequestTokenModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
        </>
    )
}