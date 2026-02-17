import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchMovies } from "../../services/api";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        items: [],
        selectedMovieId: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setSelectedMovie: (state, action) => {
            state.selectedMovieId = action.payload;
        },
        fetchMoviesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchMoviesSuccess: (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        },
        fetchMoviesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

//Actions
export const {
    setSelectedMovie,
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchMoviesFailure,
} = moviesSlice.actions;

//Selectors
export const selectAllMovies = (state) => state.movies.items;
export const selectMoviesLoading = (state) => state.movies.isLoading;
export const selectMoviesError = (state) => state.movies.error;

const selectSelectedMovieId = (state) => state.movies.selectedMovieId;
const selectMovieArg = (_, movie) => movie;
const selectCinemaIdArg = (_, __, cinemaId) => cinemaId;

export const selectSelectedMovie = createSelector(
    [selectAllMovies, selectSelectedMovieId],
    (movies, selectedId) => movies.find((movie) => movie.id === selectedId),
);

export const selectMoviesByCinema = createSelector(
    [selectAllMovies, (_, cinemaId) => cinemaId],
    (movies, cinemaId) =>
        movies.filter((movie) =>
            movie.showtimes.some((showtime) => showtime.cinema.id === cinemaId),
        ),
);

export const selectMovieShowTimesByCinema = createSelector(
    [selectMovieArg, selectCinemaIdArg],
    (movie, cinemaId) =>
        movie.showtimes.find((showtime) => showtime.cinema.id === cinemaId)
            ?.schedule || [],
);

//Thunks
export const getMovies = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchMoviesStart());
            const token = getState().auth.token;
            const movies = await fetchMovies(token);
            dispatch(fetchMoviesSuccess(movies));
        } catch (error) {
            dispatch(fetchMoviesFailure(error.message));
        }
    };
};

export default moviesSlice.reducer;
