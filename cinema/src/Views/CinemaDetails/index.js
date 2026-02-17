import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    Linking,
    Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSelectedCinema,
    setSelectedCinema,
} from "../../redux/slices/cinema-slice";
import { selectMoviesByCinema } from "../../redux/slices/movie-slice";
import { NavigationHeader } from "../../components/NavigationHeader";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import MovieShowTimes from "../../components/MovieShowTimes";
import CinemaInfoSection from "../../components/CinemaInfoSection";
import logoMap from "../../resources/logoMap";
import { formatDate } from "../../utils/dateUtil";

const CinemaDetails = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const cinema = useSelector(selectSelectedCinema);
    const movies = useSelector((state) =>
        selectMoviesByCinema(state, cinema?.id),
    );
    const [today, setToday] = useState("");

    useEffect(() => {
        const currentDate = new Date();
        setToday(formatDate(currentDate));
    }, []);

    useEffect(() => {
        dispatch(setSelectedCinema(route.params?.cinemaId));
    }, [dispatch, route.params?.cinemaId]);

    const handleWebsite = async () => {
        if (cinema.website) {
            let websiteUrl = cinema.website;
            if (
                !websiteUrl.startsWith("http://") &&
                !websiteUrl.startsWith("https://")
            ) {
                websiteUrl = "https://" + websiteUrl;
            }
            await Linking.openURL(websiteUrl);
        }
    };

    const handlePhone = async () => {
        if (cinema.phone) {
            await Linking.openURL(`tel:${cinema.phone}`);
        }
    };

    const handleLocation = async () => {
        if (cinema.address && cinema.city) {
            const searchQuery = `${cinema.name}, ${cinema.address}, ${cinema.city}, Iceland`;
            const encodedQuery = encodeURIComponent(searchQuery);

            const mapsUrl = Platform.select({
                ios: `maps://maps.apple.com/?q=${encodedQuery}`,
                android: `https://maps.google.com/maps?q=${encodedQuery}`,
            });

            try {
                const canOpen = await Linking.canOpenURL(mapsUrl);
                if (canOpen) {
                    await Linking.openURL(mapsUrl);
                } else {
                    //fallback to web google maps if native maps app cant be opened
                    const webMapsUrl = `https://maps.google.com/maps?q=${encodedQuery}`;
                    await Linking.openURL(webMapsUrl);
                }
            } catch (error) {
                throw new Error("Error opening maps:", error);
            }
        }
    };

    if (!cinema) {
        return null;
    }

    const logoSource = logoMap[cinema.id] || logoMap[0];

    return (
        <ScrollView style={styles.container}>
            <NavigationHeader title={cinema.name} />
            <View style={styles.content}>
                <View style={styles.infoBlock}>
                    <View style={styles.infoSection}>
                        <TouchableOpacity
                            onPress={handleLocation}
                            style={styles.infoRow}
                        >
                            <Ionicons
                                name="location-outline"
                                size={20}
                                color="#666"
                            />
                            <Text style={styles.linkText}>
                                {cinema.address}, {cinema.city}
                            </Text>
                        </TouchableOpacity>

                        {cinema?.phone ? (
                            <TouchableOpacity
                                onPress={handlePhone}
                                style={styles.infoRow}
                            >
                                <Ionicons
                                    name="call-outline"
                                    size={20}
                                    color="#666"
                                />
                                <Text style={styles.linkText}>
                                    {cinema.phone}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.infoRow}>
                                <Ionicons
                                    name="call-outline"
                                    size={20}
                                    color="#666"
                                />
                                <Text style={styles.linkText}>999-9999</Text>
                            </View>
                        )}

                        {cinema.website && (
                            <TouchableOpacity
                                onPress={handleWebsite}
                                style={styles.infoRow}
                            >
                                <Ionicons
                                    name="globe-outline"
                                    size={20}
                                    color="#666"
                                />
                                <Text style={styles.linkText}>
                                    {cinema.website}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <Image
                        source={logoSource}
                        style={styles.cinemaLogo}
                        resizeMode="contain"
                    />
                </View>

                <CinemaInfoSection />

                <View style={styles.content}>
                    {movies.length > 0 && (
                        <View style={styles.showtimesTitleBox}>
                            <Text
                                style={styles.showtimesTitle}
                            >{`Sýningar í dag - ${today}`}</Text>
                        </View>
                    )}
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieShowTimes
                                key={movie.id}
                                movie={movie}
                                cinemaId={cinema.id}
                            />
                        ))
                    ) : (
                        <Text style={styles.noMoviesText}>
                            Engar sýningar í {cinema.name} í dag.
                        </Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default CinemaDetails;
