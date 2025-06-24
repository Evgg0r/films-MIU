import type {AuthAction, AuthState, LoginAction, LogoutAction, SetLoadingAction} from "../../types/types";
import {AUTH_INITIAL_STATE, LOGIN, LOGOUT, SET_LOADING} from "../../constants/constants";

export function authReducer(state = AUTH_INITIAL_STATE, action: AuthAction): AuthState {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.payload.token,
                userId: action.payload.userId,
                loading: false,
            };
        case LOGOUT:
            return {
                token: null,
                userId: null,
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}

export const login = (token: string, userId: number): LoginAction => ({
    type: LOGIN,
    payload: { token, userId },
});

export const logout = (): LogoutAction => ({
    type: LOGOUT,
});

export const setLoading = (loading: boolean): SetLoadingAction => ({
    type: SET_LOADING,
    payload: loading,
});