import { configureStore } from "@reduxjs/toolkit";
import cinemaReducer from "./slices/cinema-slice";
import authReducer from "./slices/auth-slice";
import moviesReducer from "./slices/movie-slice";
import upcomingMoviesReducer from "./slices/upcoming-movie-slice";
export default configureStore({
    reducer: {
        auth: authReducer,
        cinema: cinemaReducer,
        movies: moviesReducer,
        upcomingMovies: upcomingMoviesReducer,
    },
});
