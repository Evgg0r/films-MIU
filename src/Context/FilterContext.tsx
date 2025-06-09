import {createContext, useReducer} from "react";
import type {FilterAction, FilterContextType, FilterProviderProps, FilterState} from "../types/types.ts";
import {INITIAL_STATE} from "../constants/constants.ts";

export const FilterContext = createContext<FilterContextType>({
    state: INITIAL_STATE,
    dispatch: () => {},
    });

function reducer(state: FilterState, action: FilterAction) {
    switch (action.type) {
        case 'setSortBy':
            return {...state, sortBy: action.value}
        case 'setSelectedGenres':
            return {...state, selectedGenres: action.value}
        case 'setYearRange':
            return {...state, yearRange: action.value};
        case 'setPage':
            return {...state, page: action.value};
        case 'reset':
            return INITIAL_STATE
        default:
            return state;
    }
}

export function FilterProvider({children}: FilterProviderProps) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
}
