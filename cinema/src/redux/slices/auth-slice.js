import { createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../../services/api";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        tokenExpiration: null,
        tokenError: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.tokenExpiration = action.payload.expiration;
            state.tokenError = null;
        },
        loginFailure: (state, action) => {
            state.tokenError = action.payload;
        },
    },
});

//Actions
export const { loginSuccess, loginFailure } = authSlice.actions;

//Thunks
export const ensureLoggedin = (username, password) => {
    return async (dispatch, getState) => {
        const { token, tokenExpiration } = getState().auth;
        const now = Date.now();
        if (token && tokenExpiration && now < tokenExpiration) {
            return Promise.resolve();
        }
        return dispatch(login(username, password));
    };
};
export const login = (username, password) => async (dispatch) => {
    try {
        const { token, expiration } = await authenticate(username, password);
        dispatch(loginSuccess({ token, expiration }));
    } catch (error) {
        dispatch(loginFailure(error.message));
        throw error;
    }
};

export default authSlice.reducer;
