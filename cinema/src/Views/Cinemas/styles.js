import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    list: {
        padding: 16,
    },
    cinemaItem: {
        backgroundColor: "white",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cinemaRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cinemaInfo: {
        flex: 1,
        marginRight: 12,
    },
    cinemaName: {
        fontSize: 17,
        fontFamily: "MontserratSemiBold",
        marginBottom: 4,
    },
    cinemaAddress: {
        fontFamily: "MontserratRegular",
        fontSize: 13,
        color: "#666",
        marginBottom: 4,
    },
    cinemaLogo: {
        width: 100,
        height: 50,
    },
});
