import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchUpcomingMovies } from "../../services/api";

const upcomingMoviesSlice = createSlice({
    name: "upcomingMovies",
    initialState: {
        items: [],
        selectedUpcomingMovieId: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setSelectedUpcomingMovie: (state, action) => {
            state.selectedUpcomingMovieId = action.payload;
        },
        fetchUpcomingMoviesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchUpcomingMoviesSuccess: (state, action) => {
            state.isLoading = false;
            state.items = action.payload.sort((a, b) => {
                const dateA = new Date(a["release-dateIS"]);
                const dateB = new Date(b["release-dateIS"]);
                return dateA - dateB;
            });
        },
        fetchUpcomingMoviesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    setSelectedUpcomingMovie,
    fetchUpcomingMoviesStart,
    fetchUpcomingMoviesSuccess,
    fetchUpcomingMoviesFailure,
} = upcomingMoviesSlice.actions;

export const selectAllUpcomingMovies = (state) => state.upcomingMovies.items;
export const selectUpcomingMoviesLoading = (state) =>
    state.upcomingMovies.isLoading;
export const selectUpcomingMoviesError = (state) => state.upcomingMovies.error;
export const selectSelectedUpcomingMovieId = (state) =>
    state.upcomingMovies.selectedUpcomingMovieId;

export const selectSelectedUpcomingMovie = createSelector(
    [selectAllUpcomingMovies, selectSelectedUpcomingMovieId],
    (movies, selectedId) => movies.find((movie) => movie.id === selectedId),
);

export const getUpcomingMovies = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchUpcomingMoviesStart());
            const token = getState().auth.token;
            const upcomingMovies = await fetchUpcomingMovies(token);
            dispatch(fetchUpcomingMoviesSuccess(upcomingMovies));
        } catch (error) {
            dispatch(fetchUpcomingMoviesFailure(error.message));
        }
    };
};

export default upcomingMoviesSlice.reducer;
