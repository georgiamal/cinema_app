import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Config from "../../../config";
import {
    getCinemas,
    selectAllCinemas,
    selectCinemasLoading,
    selectCinemasError,
} from "../../redux/slices/cinema-slice";
import { ensureLoggedin } from "../../redux/slices/auth-slice";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import styles from "./styles";
import logoMap from "../../resources/logoMap";

const Cinemas = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cinemas = useSelector(selectAllCinemas);
    const isLoading = useSelector(selectCinemasLoading);
    const error = useSelector(selectCinemasError);

    const sortedCinemas = useMemo(
        () => [...cinemas].sort((a, b) => a.name.localeCompare(b.name)),
        [cinemas],
    );

    useEffect(() => {
        async function loadCinemas() {
            try {
                await dispatch(
                    ensureLoggedin(Config.USERNAME, Config.PASSWORD),
                );
                await dispatch(getCinemas());
            } catch (error) {
                throw new Error(`Login failed: ${error.message}`);
            }
        }
        loadCinemas();
    }, [dispatch]);

    const renderCinemaItem = ({ item }) => {
        const logoSource = logoMap[item.id] || logoMap[0];
        return (
            <TouchableOpacity
                style={styles.cinemaItem}
                onPress={() =>
                    navigation.navigate("CinemaDetails", { cinemaId: item.id })
                }
            >
                <View style={styles.cinemaRow}>
                    <View style={styles.cinemaInfo}>
                        <Text style={styles.cinemaName}>{item.name}</Text>
                        <Text style={styles.cinemaAddress}>{item.website}</Text>
                    </View>
                    <Image
                        source={logoSource}
                        style={styles.cinemaLogo}
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={sortedCinemas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCinemaItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default Cinemas;
