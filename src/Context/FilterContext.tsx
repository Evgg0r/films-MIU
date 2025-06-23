import {createContext, useReducer} from "react";
import type {FilterActionCont, FilterContextType, FilterProviderProps, FilterState} from "../types/types.ts";
import {FILTER_INITIAL_STATE} from "../constants/constants.ts";

export const FilterContext = createContext<FilterContextType>({
    state: FILTER_INITIAL_STATE,
    dispatch: () => {},
    });

function reducer(state: FilterState, action: FilterActionCont) {
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
            return FILTER_INITIAL_STATE
        case 'setQuery':
            return { ...state, query: action.value, page: 1 }
        default:
            return state;
    }
}

export function FilterProvider({children}: FilterProviderProps) {
    const [state, dispatch] = useReducer(reducer, FILTER_INITIAL_STATE)

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
}
