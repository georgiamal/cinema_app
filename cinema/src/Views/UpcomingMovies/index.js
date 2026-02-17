import { View, FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Config from "../../../config";
import { ensureLoggedin } from "../../redux/slices/auth-slice";
import MoviesList from "../../components/MoviesList";
import styles from "./styles";
import {
    getUpcomingMovies,
    selectAllUpcomingMovies,
    selectUpcomingMoviesLoading,
    selectUpcomingMoviesError,
} from "../../redux/slices/upcoming-movie-slice";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

export function UpcomingMovies() {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(selectAllUpcomingMovies);
    const isLoading = useSelector(selectUpcomingMoviesLoading);
    const error = useSelector(selectUpcomingMoviesError);

    useEffect(() => {
        async function loadMovies() {
            try {
                await dispatch(
                    ensureLoggedin(Config.USERNAME, Config.PASSWORD),
                );
                await dispatch(getUpcomingMovies());
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
                data={upcomingMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MoviesList movie={item} showing={false} />
                )}
            />
        </View>
    );
}

export default UpcomingMovies;
