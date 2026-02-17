import { View, FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Config from "../../../config";
import { ensureLoggedin } from "../../redux/slices/auth-slice";
import MoviesList from "../../components/MoviesList";
import styles from "./styles";
import {
    getMovies,
    selectAllMovies,
    selectMoviesLoading,
    selectMoviesError,
} from "../../redux/slices/movie-slice";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

export function Movies() {
    const dispatch = useDispatch();
    const movies = useSelector(selectAllMovies);
    const isLoading = useSelector(selectMoviesLoading);
    const error = useSelector(selectMoviesError);

    useEffect(() => {
        async function loadMovies() {
            try {
                await dispatch(
                    ensureLoggedin(Config.USERNAME, Config.PASSWORD),
                );
                await dispatch(getMovies());
            } catch (error) {
                throw new Error(`Login failed: ${error.message}`);
            }
        }
        loadMovies();
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MoviesList movie={item} showing={true} />
                )}
            />
        </View>
    );
}

export default Movies;
