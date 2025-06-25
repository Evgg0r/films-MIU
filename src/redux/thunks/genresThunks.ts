import {fetchData} from "../../api/fetch";
import {URL_MOVIE_LIST} from "../../constants/urls";
import type {Genre} from "../../types/types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const    fetchGenres = createAsyncThunk<Genre[]>(
    'genres/fetchGenres',
    async () => {
        const data = await fetchData(URL_MOVIE_LIST);
        return data.genres;
    }
);

// Код для Redux
// export const fetchGenres = () => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(fetchGenresStart());
//
//         try {
//             const data = await fetchData(URL_MOVIE_LIST);
//             dispatch(fetchGenresSuccess(data.genres));
//         } catch (error) {
//             dispatch(fetchGenresFailure("Ошибка при загрузке жанров"));
//         }
//     };
// };