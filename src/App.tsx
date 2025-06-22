import '@fontsource/roboto/300.css';
import {Header} from "./components/Header/Header";
import {Filters} from "./components/Filters/Filters";
import {Box, Typography} from '@mui/material';
import {MovieCard} from "./components/MovieСard/MovieСard";
import {useInitAuth, useLoadMovies} from "./hooks/hooks";
import type {Movie, MovieResponse} from "./types/types";
import {FilterProvider} from "./Context/FilterContext";
import {Routes, Route} from 'react-router-dom';
import {MovieDetails} from './components/MovieDetails/MovieDetails';
import {LoginPage} from "./components/LoginPage/LoginPage";
import {ModalProvider} from "./Context/ModalContext";
import {ModalsContainer} from "./components/ModalsContainer/ModalsContainer";
import {useSelector} from "react-redux";
import type {RootState} from "./redux/store.ts";

export function App() {
    useInitAuth();
    const auth = useSelector((state: RootState) => state.auth);


    if (auth.loading) return null;

    if (!auth.token) {
        return (
                <ModalProvider>
                    <Header/>
                    <LoginPage/>
                    <ModalsContainer/>
                </ModalProvider>
        );
    }

    return (
        <ModalProvider>
            <FilterProvider>
                <Header/>
                <Routes>
                    <Route path="/" element={<InnerApp />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                </Routes>
                <ModalsContainer />
            </FilterProvider>
        </ModalProvider>
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
                                p={10}
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
