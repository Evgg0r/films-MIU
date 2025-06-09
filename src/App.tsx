import {Header} from "./components/Header/Header";
import {Filters} from "./components/Filters/Filters";
import {Box, Typography} from '@mui/material';
import {MovieCard} from "./components/MovieСard/MovieСard";
import {useLoadMovies} from "./hooks/hooks.tsx";
import type {Movie, MovieResponse} from "./types/types.ts";
import {FilterProvider} from "./Context/FilterContext.tsx";
import {StrictMode} from "react";

export function App() {
    return (
        <StrictMode>
            <FilterProvider>
                <Header/>
                <InnerApp/>
            </FilterProvider>
        </StrictMode>
    );
}

function InnerApp() {
    const movies:MovieResponse | null= useLoadMovies();

    return (
            <Box display="flex" p={3} gap={1}>
                <Filters totalPages={movies?.total_pages ?? 1}/>
                <Box flexGrow={1}>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={2}
                        justifyContent="flex-start"
                    >
                        {movies?.results?.length ? (
                            movies.results.map((movie: Movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))
                        ) : (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="300px"
                                width="100%"
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight={500}
                                >
                                    Фильтры не установлены.
                                    Нет фильмов для отображения
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
    )
}
