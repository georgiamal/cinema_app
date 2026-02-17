import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectSelectedCinema } from "../../redux/slices/cinema-slice";
import styles from "./styles";

const CinemaInfoSection = () => {
    const cinema = useSelector(selectSelectedCinema);
    const [expanded, setExpanded] = useState(false);

    const defaultDescription = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nulla fringilla dui id ultricies molestie. Nunc pulvinar urna et tincidunt lacinia.
        Nullam pretium nisl congue maximus vehicula.
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Vivamus accumsan orci non lectus sodales rhoncus. Proin elementum ut lorem in suscipit.
        Mauris rhoncus nibh convallis, egestas lacus sit amet, posuere ipsum.
        `
        .replace(/\s+/g, " ")
        .trim();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.header} onPress={toggleExpand}>
                <Text style={styles.sectionTitle}>Um {cinema.name}</Text>
                <Animated.View
                    style={{
                        transform: [
                            {
                                rotate: expanded ? "180deg" : "0deg",
                            },
                        ],
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color="#666"
                    />
                </Animated.View>
            </TouchableOpacity>

            {expanded && (
                <View style={{ maxHeight: 200 }}>
                    <ScrollView style={styles.content} nestedScrollEnabled>
                        <Text style={styles.description}>
                            {cinema?.description || defaultDescription}
                        </Text>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default CinemaInfoSection;
