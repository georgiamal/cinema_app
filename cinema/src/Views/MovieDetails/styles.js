import { StyleSheet } from "react-native";

export default StyleSheet.create({
    moviesContainer: {
        flex: 1,
        margin: "3%",
        backgroundColor: "white",
        padding: "2%",
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontFamily: "MontserratSemiBold",
        paddingVertical: "2%",
        color: "#929ff8",
        textAlign: "center",
    },
    moviePoster: {
        height: 300,
        width: 200,
        margin: "3%",
        borderRadius: 10,
    },
    info: {
        fontFamily: "MontserratRegular",
    },
    plot: {
        fontFamily: "MontserratRegular",
        padding: "3%",
        textAlign: "justify",
    },
    duration: {
        fontFamily: "MontserratRegular",
        color: "#454545",
        backgroundColor: "#cfcfcf",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        margin: "2%",
    },
    trailer: {
        padding: "3%",
        width: "100%",
        aspectRatio: 16 / 9,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#9e9e9e",
        marginVertical: 10,
    },
    showtimesTitleBox: {
        flex: 1,
        alignContent: "center",
        borderBottomWidth: 1,
        borderBlockColor: "#9e9e9e",
        paddingBottom: 10,
        paddingTop: 6,
        marginBottom: 10,
    },
    showtimesTitle: {
        fontSize: 17,
        fontFamily: "MontserratRegular",
        fontWeight: "600",
        textAlign: "center",
        color: "#929ff8",
    },
    showtimes: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        paddingBottom: "8%",
    },
    cinemaContainer: {
        margin: "2%",
    },
    cinemaName: {
        fontFamily: "MontserratRegular",
        fontSize: 17,
        textAlign: "center",
        paddingBottom: "2%",
    },
    timeSlots: {
        fontFamily: "MontserratRegular",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBlockColor: "#cfcfcf",
        paddingBottom: "2%",
    },
    time: {
        borderWidth: 1,
        borderColor: "#818ad4",
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        margin: "2%",
        backgroundColor: "#a2adfa",
        borderRadius: 8,
    },
    timeText: {
        fontFamily: "MontserratRegular",
        color: "#fff",
    },
    infoText: {
        fontFamily: "MontserratRegular",
        color: "#1a2054",
        fontSize: 10,
    },
    releaseDate: {
        fontFamily: "MontserratRegular",
        fontWeight: "bold",
        fontSize: 16,
        color: "#929ff8",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        color: "#DEB522", //IMDb color
        marginRight: 4,
        fontWeight: "bold",
    },
    ratingLabel: {
        fontSize: 14,
        color: "#666",
    },
});
