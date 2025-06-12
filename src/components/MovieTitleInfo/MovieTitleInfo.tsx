import {Box, IconButton, Typography} from "@mui/material";
import {Star} from "@mui/icons-material";
import type {MovieTitleInfoProps} from "../../types/types.ts";

export function MovieTitleInfo({movieTitle, movieYear}: MovieTitleInfoProps) {
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
            <IconButton>
                <Star fontSize="large" sx={{color: '#f9a825'}}/>
            </IconButton>
        </Box>
    )
}