import {Box, Card, CardContent, CardMedia, Typography, Paper} from "@mui/material";
import {Star} from "@mui/icons-material";
import type {MovieCardProps} from "../../types/types.ts";
import {Link} from "react-router-dom";


export function MovieCard({movie}: MovieCardProps) {
    return (
        <Paper component={Link}
               to={`/movies/${movie.id}`}
               sx={{textDecoration: 'none'}}>
            <Card sx={{width: 296, height: 324}}>
                <CardMedia
                    component="img"
                    width="324"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                        height: 240,
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h6">{movie.title}</Typography>
                            <Typography variant="body2">{movie.vote_average}</Typography>
                        </Box>
                        <Star/>
                    </Box>
                </CardContent>
            </Card>
        </Paper>

    )
}