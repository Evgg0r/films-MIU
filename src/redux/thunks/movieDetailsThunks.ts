import {fetchData} from "../../api/fetch";
import type {CreditsResponse, MovieDetailsResponse} from "../../types/types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchMovieDetails = createAsyncThunk<{ details: MovieDetailsResponse; credits: CreditsResponse }, number>(
    "movieDetails/fetchMovieDetails",
    async (movieId: number) => {
        const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ru`;
        const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ru`;

        const [details, credits] = await Promise.all([
            fetchData(detailsUrl),
            fetchData(creditsUrl),
        ]);

        return { details, credits } as {
            details: MovieDetailsResponse;
            credits: CreditsResponse;
        };
    }
);

// Код для Redux
// export const fetchMovieInfo = (movieId: string) => {
//     return async (dispatch: AppDispatch) => {
//         if (!movieId) return;
//
//         dispatch(fetchMovieInfoStart());
//
//         const infoUrl = `${MOVIE_URL}${movieId}?language=ru`;
//         const creditsUrl = `${MOVIE_URL}${movieId}/credits?language=ru`;
//
//         try {
//             const [details, credits] = await Promise.all([
//                 fetchData(infoUrl),
//                 fetchData(creditsUrl)
//             ]);
//
//             dispatch(fetchMovieInfoSuccess(details, credits));
//         } catch (error) {
//             dispatch(fetchMovieInfoFailure("Ошибка загрузки данных о фильме"));
//             console.error(error);
//         }
//     };
// };