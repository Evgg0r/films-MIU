import { useEffect, useState } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchData } from '@/api/fetch';
import type { RootState } from '@/redux/store';
import type { CreditsResponse, MovieDetailsResponse } from '@/types/types';

export const fetchMovieFavorites = createAsyncThunk<number[], void, { state: RootState }>(
    'movieFavorites/fetchMovieFavorites',
    async (_, { getState, rejectWithValue }) => {
        const userId = getState().auth.userId;
        if (!userId) return rejectWithValue('Нет userId');

        const url = `https://api.themoviedb.org/3/account/${userId}/favorite/movies?language=ru&page=1&sort_by=created_at.asc`;

        try {
            const data = await fetchData(url);
            return data.results.map((movie: { id: number }) => movie.id);
        } catch (error) {
            console.error(error);
            return rejectWithValue('Ошибка загрузки избранных фильмов');
        }
    },
);

export function useMovieInfo(movieId: string) {
    const [details, setDetails] = useState<MovieDetailsResponse | null>(null);
    const [credits, setCredits] = useState<CreditsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!movieId) return;

        const fetchMovie = async () => {
            try {
                const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ru`;
                const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ru`;

                const [detailsRes, creditsRes] = await Promise.all([
                    fetchData(detailsUrl),
                    fetchData(creditsUrl),
                ]);

                setDetails(detailsRes);
                setCredits(creditsRes);
            } catch (err) {
                setError('Ошибка загрузки данных');
            }
        };

        fetchMovie();
    }, [movieId]);

    return { details, credits, error };
}
