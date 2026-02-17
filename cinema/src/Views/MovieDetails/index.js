import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSelectedMovie,
    setSelectedMovie,
} from "../../redux/slices/movie-slice";
import {
    selectSelectedUpcomingMovie,
    setSelectedUpcomingMovie,
} from "../../redux/slices/upcoming-movie-slice";
import { NavigationHeader } from "../../components/NavigationHeader";
import { formatDate } from "../../utils/dateUtil";
import styles from "./styles";
import { WebView } from "react-native-webview";

const MovieDetails = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const { showing, cinemaId } = route.params;
    const movie = useSelector(
        showing ? selectSelectedMovie : selectSelectedUpcomingMovie,
    );

    const [today, setToday] = useState("");

    useEffect(() => {
        const currentDate = new Date();
        setToday(formatDate(currentDate));
    }, []);

    useEffect(() => {
        if (showing) {
            dispatch(setSelectedMovie(route.params?.movieId));
        } else {
            dispatch(setSelectedUpcomingMovie(route.params?.movieId));
        }
    }, [dispatch, route.params?.movieId]);

    if (!movie) {
        return null;
    }

    const handlePurchase = async (url) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            throw new Error(`Error opening URL: ${error.message}`);
        }
    };

    const trailer =
        movie.trailers && movie.trailers[0] && movie.trailers[0].results[0];

    const filteredShowtimes = cinemaId
        ? movie.showtimes.filter((cinema) => cinema.cinema.id === cinemaId)
        : movie.showtimes;

    const sortedShowtimes = [...(filteredShowtimes || [])].sort((a, b) =>
        (a?.cinema?.name || "").localeCompare(b?.cinema?.name || ""),
    );

    const renderShowtime = (showtime) => (
        <TouchableOpacity
            key={showtime.time}
            style={styles.time}
            onPress={() => handlePurchase(showtime.purchase_url)}
        >
            <Text style={styles.timeText}>{showtime.time.split(" ")[0]}</Text>
            {showtime.info !== "" && (
                <Text style={styles.infoText}>{showtime.info}</Text>
            )}
        </TouchableOpacity>
    );

    const renderCinema = (cinema) => (
        <View style={styles.cinemaContainer} key={cinema.cinema.id}>
            <Text style={styles.cinemaName}>{cinema.cinema.name}</Text>
            <View style={styles.timeSlots}>
                {cinema.schedule.map(renderShowtime)}
            </View>
        </View>
    );

    const defaultPlot = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nulla fringilla dui id ultricies molestie. Nunc pulvinar urna et tincidunt lacinia.
        Nullam pretium nisl congue maximus vehicula.
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Vivamus accumsan orci non lectus sodales rhoncus. Proin elementum ut lorem in suscipit.
        Mauris rhoncus nibh convallis, egestas lacus sit amet, posuere ipsum.
        `
        .replace(/\s+/g, " ")
        .trim();

    return (
        <View style={styles.moviesContainer}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <NavigationHeader title={movie.title} />
                <View style={styles.posterColumn}>
                    <Image
                        source={{ uri: movie.poster }}
                        style={styles.moviePoster}
                    />
                </View>
                {movie?.ratings?.imdb && (
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>{movie.ratings.imdb}</Text>
                        <Text style={styles.ratingLabel}>IMDb</Text>
                    </View>
                )}
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.plot}>
                    {movie?.plot && movie.plot.trim() !== ""
                        ? movie.plot
                        : defaultPlot}
                </Text>
                {trailer && (
                    <View style={styles.trailer}>
                        <WebView
                            source={{
                                uri: `https://www.youtube.com/embed/${trailer.key}`,
                            }}
                        />
                    </View>
                )}
                {showing && (
                    <>
                        <Text style={styles.duration}>
                            {movie.durationMinutes + " min."}
                        </Text>
                        <Text style={styles.info}>{movie.year}</Text>
                    </>
                )}
                <Text style={styles.info}>
                    {movie.genres
                        .filter((genre) => genre.Name)
                        .map((genre) => genre.Name)
                        .join(", ")}
                </Text>
                <View style={styles.divider} />
                {showing ? (
                    <View style={styles.showtimes}>
                        <View style={styles.showtimesTitleBox}>
                            <Text
                                style={styles.showtimesTitle}
                            >{`Sýningar í dag - ${today}`}</Text>
                        </View>
                        {sortedShowtimes?.map(renderCinema)}
                    </View>
                ) : (
                    <Text style={styles.releaseDate}>
                        Kemur í bíó {formatDate(movie["release-dateIS"])}
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default MovieDetails;
