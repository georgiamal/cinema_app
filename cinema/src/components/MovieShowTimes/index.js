import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
    setSelectedMovie,
    selectMovieShowTimesByCinema,
} from "../../redux/slices/movie-slice";
import styles from "./styles";
import PropTypes from "prop-types";

const MovieShowTimes = ({ movie, cinemaId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const showTimes = useSelector((state) =>
        selectMovieShowTimesByCinema(state, movie, cinemaId),
    );

    const handleSeeDetails = () => {
        dispatch(setSelectedMovie(movie.id));
        navigation.navigate("MovieDetails", {
            movieId: movie.id,
            showing: true,
            cinemaId,
        });
    };

    const handlePurchase = async (url) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            throw new ("Error opening URL:", error)();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSeeDetails}>
                <View style={styles.movieCard}>
                    <Image
                        source={{ uri: movie.poster }}
                        style={styles.poster}
                        resizeMode="cover"
                    />
                    <View style={styles.movieInfo}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <Text style={styles.year}>
                            {"(" + movie.year + ")"}
                        </Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>
                                {movie.ratings.imdb}
                            </Text>
                            <Text style={styles.ratingLabel}>IMDb</Text>
                        </View>
                        <View style={styles.genresContainer}>
                            {movie.genres.map((genre) => (
                                <View key={genre.ID} style={styles.genreTag}>
                                    <Text style={styles.genreText}>
                                        {genre.Name}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {showTimes && showTimes.length > 0 && (
                    <View style={styles.showTimesSection}>
                        <Text style={styles.showTimesTitle}>Kaupa miða</Text>
                        <View style={styles.showTimesContainer}>
                            {showTimes.map((showtime, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.timeSlot}
                                    onPress={() =>
                                        handlePurchase(showtime.purchase_url)
                                    }
                                >
                                    <Text style={styles.timeText}>
                                        {showtime.time.split(" ")[0]}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default MovieShowTimes;

MovieShowTimes.propTypes = {
    cinemaId: PropTypes.number,
    movie: PropTypes.shape({
        id: PropTypes.number,
        poster: PropTypes.string,
        title: PropTypes.string,
        year: PropTypes.string,
        genres: PropTypes.arrayOf(
            PropTypes.shape({
                ID: PropTypes.number,
                Name: PropTypes.string,
            }),
        ),
        ratings: PropTypes.object,
    }),
};
