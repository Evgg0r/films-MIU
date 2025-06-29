import '@fontsource/roboto/300.css';

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Filters } from '@/components/Filters/Filters';
import { Header } from '@/components/Header/Header';
import { LoginPage } from '@/components/LoginPage/LoginPage';
import { ModalsContainer } from '@/components/ModalsContainer/ModalsContainer';
import { MovieDetails } from '@/components/MovieDetails/MovieDetails';
import { MovieCard } from '@/components/MovieСard/MovieСard';
import { useInitAuth, useInitFavorites, useMovies } from '@/hooks';
import type { RootState } from '@/redux/store';
import type { Movie } from '@/types/types';

export function App() {
    useInitAuth();
    const auth = useSelector((state: RootState) => state.auth);

    if (auth.loading) return null;

    if (!auth.token) {
        return (
            <>
                <Header />
                <LoginPage />
                <ModalsContainer />
            </>
        );
    }

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<InnerApp />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
            </Routes>
            <ModalsContainer />
        </>
    );
}

function InnerApp() {
    useInitFavorites();
    const { movies } = useMovies();

    return (
        <Box display="flex" p={3} gap={1}>
            <Filters totalPages={movies?.total_pages ?? 1} />
            <Box flexGrow={1}>
                <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
                    {movies?.results?.length ? (
                        movies.results.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="300px"
                            width="100%"
                            p={10}
                        >
                            <Typography variant="h5" fontWeight={500}>
                                Фильтры не установлены. Нет фильмов для отображения
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
