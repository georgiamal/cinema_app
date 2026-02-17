import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSelectedCinema } from "../../redux/slices/cinema-slice";
import styles from "./styles";
import PropTypes from "prop-types";

const CinemaList = ({ cinema }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(setSelectedCinema(cinema.id));
        navigation.navigate("CinemaDetails", {
            cinemaId: cinema.id,
        });
    };

    return (
        <TouchableOpacity style={styles.item} onPress={handlePress}>
            <Text style={styles.name}>{cinema.name}</Text>
            <Text style={styles.address}>{cinema.website}</Text>
            {cinema.phone && <Text style={styles.phone}>{cinema.phone}</Text>}
        </TouchableOpacity>
    );
};

export default CinemaList;

CinemaList.propTypes = {
    cinema: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        website: PropTypes.string,
        phone: PropTypes.string,
    }),
};
