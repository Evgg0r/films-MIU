import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchData } from '@/api/fetch';
import { URL_MOVIE_LIST } from '@/constants/urls';
import type { Genre } from '@/types/types';

export const fetchGenres = createAsyncThunk<Genre[]>('genres/fetchGenres', async () => {
    const data = await fetchData(URL_MOVIE_LIST);
    return data.genres;
});
