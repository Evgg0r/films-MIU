import { createStore, combineReducers } from 'redux';
import {authReducer} from './reducers/authReducer';
import {modalReducer} from "./reducers/modalReducer";
import {filterReducer} from "./reducers/filterReducer.ts";

const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    filter: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);