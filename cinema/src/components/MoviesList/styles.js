import { StyleSheet } from "react-native";

export default StyleSheet.create({
    moviesContainer: {
        flex: 1,
        padding: "1%",
        margin: "1%",
    },
    movieItem: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding: "2%",
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 17,
        fontFamily: "MontserratSemiBold",
        marginBottom: "1%",
    },
    info: {
        fontFamily: "MontserratRegular",
        marginBottom: "1%",
    },
    moviePoster: {
        height: 150,
        width: 100,
        overflow: "hidden",
        borderRadius: 8,
    },
    posterColumn: {
        flex: 1,
        marginRight: "9%",
    },
    textColumn: {
        flex: 3,
    },
    genreItem: {
        fontFamily: "MontserratRegular",
        marginBottom: "1%",
        color: "#454545",
    },
});
