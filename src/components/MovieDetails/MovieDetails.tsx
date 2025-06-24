import '@fontsource/roboto/400.css'
import {Box, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useInitMovieInfo} from "../../hooks/hooks";
import {convertServerDetailsToMovie,} from "../../utils/utils";
import {MovieInfoDetails} from "../MovieInfoDetails/MovieInfoDetails";
import {MovieActorsInfo} from "../MovieActorsInfo/MovieActorsInfo";
import {MovieTitleInfo} from "../MovieTitleInfo/MovieTitleInfo";
import {MovieBackButton} from "../MovieBackButton/MovieBackButton";
import {MoviePoster} from "../MoviePoster/MoviePoster";
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/store.ts";

export function MovieDetails() {
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return null
    }

    useInitMovieInfo(id);
    const { details, credits} = useSelector((state: RootState) => state.moviesDetails);

    if (!details || !credits) {
        return <Typography p={4}>Загрузка данных…</Typography>;
    }

    const movie = convertServerDetailsToMovie(details, credits)

    return (
        <Box display="flex" p={3} gap={3}>
            <MoviePoster movieTitle={movie.title} urlPoster={movie.poster}/>
            <Box display="flex" flexGrow={1} flexDirection="column" alignItems="start" gap={1}>
                <MovieTitleInfo movieTitle={movie.title} movieYear={movie.year} movieIdValue={Number(id)}/>
                <MovieBackButton/>
                <MovieActorsInfo castActors={movie.cast}/>
                <MovieInfoDetails movieDetails={movie.details}/>
            </Box>
        </Box>
    )
}