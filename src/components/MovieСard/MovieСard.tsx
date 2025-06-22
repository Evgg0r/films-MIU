import {Box, Card, CardContent, CardMedia, Typography, Paper} from "@mui/material";
import type {MovieCardProps} from "../../types/types";
import {Link} from "react-router-dom";
import {FavoriteButton} from "../FavoriteButton/FavoriteButton";
import {memo} from "react";


export const MovieCard = memo(({movie}: MovieCardProps) => {
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
                            <Typography variant="h6"
                                        noWrap
                                        sx={{
                                            maxWidth: 224,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                            >{movie.title}</Typography>
                            <Typography variant="body2">Рейтинг {movie.vote_average}</Typography>
                        </Box>
                        <FavoriteButton movieId={movie.id} />
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    )
})