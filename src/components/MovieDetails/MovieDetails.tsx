import '@fontsource/roboto/400.css'
import {Box, Typography} from '@mui/material';
import { useParams} from 'react-router-dom';
import {useLoadMovieInfo} from "../../hooks/hooks";
import {convertServerDetailsToMovie,} from "../../utils/utils";
import {MovieInfoDetails} from "../MovieInfoDetails/MovieInfoDetails.tsx";
import {MovieActorsInfo} from "../MovieActorsInfo/MovieActorsInfo.tsx";
import {MovieTitleInfo} from "../MovieTitleInfo/MovieTitleInfo.tsx";
import {MovieBackButton} from "../MovieBackButton/MovieBackButton.tsx";
import {MoviePoster} from "../MoviePoster/MoviePoster.tsx";

export function MovieDetails() {
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return null
    }

    const {details, credits} = useLoadMovieInfo(id);

    if (!details || !credits) {
        return <Typography p={4}>Загрузка данных…</Typography>;
    }

    const movie = convertServerDetailsToMovie(details, credits)

    return (
        <Box display="flex" p={3} gap={3}>
            <MoviePoster movieTitle={movie.title} urlPoster={movie.poster}/>
            <Box display="flex" flexGrow={1} flexDirection="column" alignItems="start" gap={1}>
                <MovieTitleInfo movieTitle={movie.title} movieYear={movie.year}/>
                <MovieBackButton/>
                <MovieActorsInfo castActors={movie.cast}/>
                <MovieInfoDetails movieDetails={movie.details}/>
            </Box>
        </Box>
    )
}