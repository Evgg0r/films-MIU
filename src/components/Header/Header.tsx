import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

export function Header() {

    return (
        <AppBar position="static">
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography
                    variant="h6"
                    component="div">
                    Фильмы
                </Typography>
                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="account of current user"
                >
                    <AccountCircle/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}