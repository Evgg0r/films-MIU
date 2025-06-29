import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchData } from '@/api/fetch';
import { setLoading } from '@/redux/slices/authSlice';
import type { RootState } from '@/redux/store';
import type { MovieResponse } from '@/types/types';

export function useMovies() {
    const filter = useSelector((state: RootState) => state.filter);
    const [movies, setMovies] = useState<MovieResponse | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);

            const { query, sortBy, selectedGenres, yearRange, page } = filter;

            let url = '';

            if (query.trim()) {
                url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ru&page=${page}`;
            } else {
                const genreParam = selectedGenres.length
                    ? `&with_genres=${selectedGenres.join(',')}`
                    : '';

                const yearParam = yearRange
                    ? `&primary_release_date.gte=${yearRange[0]}-01-01&primary_release_date.lte=${yearRange[1]}-12-31`
                    : '';

                const sortParam = sortBy === 'rating' ? 'vote_average.desc' : 'popularity.desc';

                url = `https://api.themoviedb.org/3/discover/movie?language=ru&page=${page}&sort_by=${sortParam}${genreParam}${yearParam}`;
            }

            try {
                const data = await fetchData(url);
                setMovies(data);
            } catch (error) {
                console.error('Ошибка загрузки фильмов:', error);
                setMovies(null);
            }
        };

        fetchMovies();
    }, [filter]);

    return { movies };
}
