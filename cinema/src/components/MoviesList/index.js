import { Text, TouchableOpacity, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../../redux/slices/movie-slice";
import { setSelectedUpcomingMovie } from "../../redux/slices/upcoming-movie-slice";
import { formatDate } from "../../utils/dateUtil";
import styles from "./styles";
import PropTypes from "prop-types";

const MoviesList = ({ movie, showing }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handlePress = () => {
        if (showing) {
            dispatch(setSelectedMovie(movie.id));
        } else {
            dispatch(setSelectedUpcomingMovie(movie.id));
        }
        navigation.navigate("MovieDetails", {
            movieId: movie.id,
            showing,
        });
    };

    return (
        <View style={styles.moviesContainer}>
            <TouchableOpacity style={styles.movieItem} onPress={handlePress}>
                <View style={styles.posterColumn}>
                    <Image
                        source={{ uri: movie.poster }}
                        style={styles.moviePoster}
                    />
                </View>
                <View style={styles.textColumn}>
                    <Text style={styles.title}>{movie.title}</Text>
                    {showing ? (
                        <Text style={styles.info}>{movie.year}</Text>
                    ) : (
                        <Text style={styles.info}>
                            {formatDate(movie["release-dateIS"])}
                        </Text>
                    )}
                    <Text style={styles.info}>
                        {movie.genres.map((genre) => genre.Name).join(", ")}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MoviesList;

MoviesList.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number,
        poster: PropTypes.string,
        title: PropTypes.string,
        year: PropTypes.string,
        "release-dateIS": PropTypes.string,
        genres: PropTypes.arrayOf(
            PropTypes.shape({
                Name: PropTypes.string,
            }),
        ),
    }),
    showing: PropTypes.bool,
};
