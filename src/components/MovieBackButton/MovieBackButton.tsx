import {ArrowBack} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function MovieBackButton () {
    const navigate = useNavigate();

    return (
        <IconButton
            sx={{
                p: 0,
                height: 51
            }}
            onClick={() => navigate(-1)}>
            <ArrowBack fontSize="large"/>
        </IconButton>
    )
}