import {useContext, useEffect, useState} from "react";
import {FilterContext} from "../Context/FilterContext.tsx";
import type {FilterContextType, Genre} from "../types/types.tsx";
import {UserContext} from "../Context/UserContext.tsx";
import {fetchData} from "../api/fetch.tsx";
import {URL_MOVIE_LIST} from "../constants/urls.ts";

export function useFilterContext(): FilterContextType {
    return useContext(FilterContext);
}

export function useLoadGenres() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const userToken = useContext(UserContext);

    useEffect(() => {
        fetchData(URL_MOVIE_LIST, userToken)
            .then((data) => setGenres(data.genres))
            .catch((error) => console.error(error));
    }, [userToken]);

    return genres;
}
