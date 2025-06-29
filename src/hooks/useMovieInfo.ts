import { useEffect, useState } from 'react';

import { fetchData } from '@/api/fetch';
import type { CreditsResponse, MovieDetailsResponse } from '@/types/types';

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
