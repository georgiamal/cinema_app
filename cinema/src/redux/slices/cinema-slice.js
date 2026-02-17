import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getCinemas as fetchCinemas } from "../../services/api";

const cinemaSlice = createSlice({
    name: "cinema",
    initialState: {
        items: [],
        selectedCinemaId: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setSelectedCinema: (state, action) => {
            state.selectedCinemaId = action.payload;
        },
        getCinemasStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        getCinemasSuccess: (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        },
        getCinemasFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

//Actions
export const {
    setSelectedCinema,
    getCinemasStart,
    getCinemasSuccess,
    getCinemasFailure,
} = cinemaSlice.actions;

//Selectors
export const selectAllCinemas = (state) => state.cinema.items;
export const selectCinemasLoading = (state) => state.cinema.isLoading;
export const selectCinemasError = (state) => state.cinema.error;

const selectSelectedCinemaId = (state) => state.cinema.selectedCinemaId;

export const selectSelectedCinema = createSelector(
    [selectAllCinemas, selectSelectedCinemaId],
    (cinemas, selectedId) => cinemas.find((cinema) => cinema.id === selectedId),
);

//Thunks
export const getCinemas = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(getCinemasStart());
            const token = getState().auth.token;
            const cinemas = await fetchCinemas(token);
            dispatch(getCinemasSuccess(cinemas));
        } catch (error) {
            dispatch(getCinemasFailure(error.message));
        }
    };
};

export default cinemaSlice.reducer;
