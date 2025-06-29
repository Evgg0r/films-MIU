import '@fontsource/roboto/400.css';

import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { MovieActorsInfo } from '@/components/MovieActorsInfo';
import { MovieBackButton } from '@/components/MovieBackButton';
import { MovieInfoDetails } from '@/components/MovieInfoDetails';
import { MoviePoster } from '@/components/MoviePoster';
import { MovieTitleInfo } from '@/components/MovieTitleInfo';
import { useMovieInfo } from '@/hooks';
import { convertServerDetailsToMovie } from '@/utils/utils';

export function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const { details, credits, error } = useMovieInfo(id || '');

    if (!id) {
        return null;
    }

    if (!details || !credits) {
        return <Typography p={4}>Загрузка данных…</Typography>;
    }

    if (error) {
        return <Typography p={4}>{error}</Typography>;
    }

    const movie = convertServerDetailsToMovie(details, credits);

    return (
        <Box display="flex" p={3} gap={3}>
            <MoviePoster movieTitle={movie.title} urlPoster={movie.poster} />
            <Box display="flex" flexGrow={1} flexDirection="column" alignItems="start" gap={1}>
                <MovieTitleInfo
                    movieTitle={movie.title}
                    movieYear={movie.year}
                    movieIdValue={Number(id)}
                />
                <MovieBackButton />
                <MovieActorsInfo castActors={movie.cast} />
                <MovieInfoDetails movieDetails={movie.details} />
            </Box>
        </Box>
    );
}
