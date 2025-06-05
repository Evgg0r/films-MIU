import {Header} from "./components/Header/Header";
import {Filters} from "./components/Filters/Filters";
import {Box} from '@mui/material';
import {MovieCard} from "./components/MovieСard/MovieСard";
import {FilterProvider} from "./Context/FilterContext";

export function App() {

    return (
            <FilterProvider>
                <Header/>
                <Box display="flex" p={3} gap={1}>
                    <Filters/>
                    <Box flexGrow={1}>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            gap={2}
                            justifyContent="flex-start"
                        >
                            <MovieCard/>
                            <MovieCard/>
                            <MovieCard/>
                            <MovieCard/>
                            <MovieCard/>
                            <MovieCard/>
                        </Box>
                    </Box>
                </Box>
            </FilterProvider>
    )
}
