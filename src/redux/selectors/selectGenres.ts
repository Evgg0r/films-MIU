import type { RootState } from '@/redux/store';
import type { Genre } from '@/types';

export const selectGenres = (state: RootState): Genre[] => state.genres.genres;
