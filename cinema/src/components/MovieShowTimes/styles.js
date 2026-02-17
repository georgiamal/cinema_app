import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    movieCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "3%",
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 8,
    },
    movieInfo: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: "MontserratSemiBold",
        fontWeight: "600",
    },
    ratingContainer: {
        flexDirection: "row",
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        fontFamily: "MontserratSemiBold",
        color: "#DEB522", //IMDb color
        marginRight: "1%",
        paddingHorizontal: "1%",
    },
    ratingLabel: {
        fontSize: 14,
        fontFamily: "MontserratRegular",
        color: "#666",
    },
    details: {
        fontSize: 14,
        fontFamily: "MontserratRegular",
        color: "#666",
        marginBottom: "2%",
    },
    genresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    genreTag: {
        backgroundColor: "#f0f0f0",
        paddingVertical: "1%",
        paddingHorizontal: "2%",
        margin: "1%",
        borderRadius: 4,
    },
    genreText: {
        fontSize: 12,
        fontFamily: "MontserratRegular",
        color: "#666",
    },
    showTimesSection: {
        marginTop: "4%",
        paddingTop: "2%",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
    },
    showTimesTitle: {
        fontSize: 14,
        fontFamily: "MontserratRegular",
        fontWeight: "600",
    },
    showTimesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    timeSlot: {
        borderWidth: 1,
        borderColor: "#818ad4",
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        marginTop: "2%",
        marginRight: "3%",
        backgroundColor: "#a2adfa",
        borderRadius: 8,
    },
    timeText: {
        fontSize: 14,
        fontFamily: "MontserratRegular",
        color: "#fff",
    },
    year: {
        fontSize: 12,
        fontFamily: "MontserratRegular",
        color: "#6e6e6e",
    },
});
