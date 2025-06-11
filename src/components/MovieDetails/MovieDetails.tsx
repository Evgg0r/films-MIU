import '@fontsource/roboto/400.css'
import {Box, Typography, IconButton} from '@mui/material';
import {Star, ArrowBack} from '@mui/icons-material';
import {useNavigate, useParams} from 'react-router-dom';
import {useLoadMovieInfo} from "../../hooks/hooks";
import {formatBudget, getDirector, getWriters} from "../../utils/utils";


export function MovieDetails() {
    const {id} = useParams<{id?: string}>();
    const {details, credits} = useLoadMovieInfo(id);
    const navigate = useNavigate();

    if (!details || !credits) {
        return <Typography p={4}>Загрузка данных…</Typography>;
    }

    const movie = {
        title: details.title,
        year: details.release_date.slice(0, 4,),
        poster: details.poster_path,
        rating: details.vote_average.toFixed(1),
        cast: credits.cast,
        details: [
                { label: 'Страна', value: details.production_countries?.[0]?.name || '—' },
                { label: 'Жанр', value: details.genres?.map(g => g.name).join(', ') || '—' },
                { label: 'Режиссёр', value: getDirector(credits) },
                { label: 'Сценарий', value: getWriters(credits) },
                { label: 'Бюджет', value: formatBudget(details.budget) },
                { label: 'Продолжительность', value: `${details.runtime} мин` },
        ],
    };

    return (
        <Box display="flex" p={3} gap={3}>
            <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                alt={movie.title}
                sx={{width: 300, height: 402}}
            />
            <Box display="flex" flexGrow={1} flexDirection="column" alignItems="start" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '48px',
                            fontWeight: 400
                        }}>
                        {movie.title} ({movie.year})
                    </Typography>
                    <IconButton>
                        <Star fontSize="large" sx={{color: '#f9a825'}}/>
                    </IconButton>
                </Box>
                <IconButton
                    sx={{
                        p: 0,
                        height: 51
                    }}
                    onClick={() => navigate(-1)}>
                    <ArrowBack fontSize="large"/>
                </IconButton>
                <Box>
                    <Typography
                        variant="h5"
                        component="p"
                        mb={2}
                        sx={{
                            fontSize: '34px',
                            fontWeight: 500
                        }}>
                        В главных ролях
                    </Typography>
                    {credits.cast.slice(0, 4).map((actor) => (
                        <Typography
                            variant="h5"
                            component="p"
                            key={actor.id}
                            sx={{
                                fontSize: '20px',
                                fontWeight: 400
                            }}>
                            {actor.name}
                        </Typography>
                    ))}
                </Box>

                <Box mt={8}>
                    <Typography
                        variant="h5"
                        mb={3}
                        sx={{
                            fontSize: '34px',
                            fontWeight: 500
                        }}>
                        Детали
                    </Typography>
                    <Box display="flex" flexDirection={"column"} alignItems="start" gap={1} >
                        {movie.details.map(({ label, value }) => (
                            <Box
                                key={label}
                                display="flex"
                                gap={1}
                            >
                                <Box width={200}>
                                    <Typography color="text.secondary">{label}</Typography>
                                </Box>
                                <Box>
                                    <Typography>{value}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}