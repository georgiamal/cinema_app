import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    content: {
        padding: 16,
    },
    infoBlock: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    infoSection: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: "MontserratSemiBold",
        marginBottom: 12,
        paddingTop: 24,
        textAlign: "center",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    infoText: {
        fontFamily: "MontserratRegular",
        fontSize: 16,
        marginLeft: 8,
        color: "#333",
    },
    linkText: {
        fontFamily: "MontserratRegular",
        fontSize: 16,
        marginLeft: 8,
        color: "#007AFF",
    },
    cinemaLogo: {
        width: 160,
        height: 50,
        marginHorizontal: 10,
    },
    descriptionSection: {
        marginTop: 8,
    },
    description: {
        fontFamily: "MontserratRegular",
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },
    noMoviesText: {
        fontFamily: "MontserratRegular",
        textAlign: "center",
        fontSize: 16,
        color: "#666",
        marginTop: 20,
        marginBottom: 20,
    },
    showtimesTitleBox: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBlockColor: "#cfcfcf",
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 14,
        marginTop: 10,
    },
    showtimesTitle: {
        fontSize: 17,
        fontFamily: "MontserratRegular",
        fontWeight: "600",
        textAlign: "center",
        color: "#929ff8",
    },
});
