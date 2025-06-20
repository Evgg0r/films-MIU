import {mutateData} from "../../api/fetch";
import type {FavoriteRequestBody} from "../../types/types";

export function mutateFavoriteFilm(url: string, body: FavoriteRequestBody) {
    return mutateData(url, body);
}