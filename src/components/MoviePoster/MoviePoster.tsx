import {Box} from "@mui/material";
import type {MoviePosterProps} from "../../types/types.ts";

export function MoviePoster({movieTitle, urlPoster}: MoviePosterProps) {
    return (
        <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${urlPoster}`}
            alt={movieTitle}
            sx={{width: 300, height: 402}}
        />
    )
}