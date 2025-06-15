import {Box, Typography} from "@mui/material";
import type {MovieTitleInfoProps} from "../../types/types";
import {FavoriteButton} from "../FavoriteButton/FavoriteButton";

export function MovieTitleInfo({movieTitle, movieYear, movieIdValue}: MovieTitleInfoProps) {
    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Typography
                variant="h1"
                sx={{
                    fontSize: '48px',
                    fontWeight: 400
                }}>
                {movieTitle} ({movieYear})
            </Typography>

            <FavoriteButton movieId={movieIdValue}/>
        </Box>
    )
}