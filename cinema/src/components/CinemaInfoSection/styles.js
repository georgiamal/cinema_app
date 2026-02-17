import { StyleSheet } from "react-native";

export default StyleSheet.create({
    infoContainer: {
        marginVertical: 10,
        borderRadius: 8,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#e6e6e6",
    },
    content: {
        maxHeight: 170,
        paddingHorizontal: 16,
        flexGrow: 1,
        backgroundColor: "#e6e6e6",
    },
    description: {
        fontFamily: "MontserratRegular",
        paddingVertical: 16,
        color: "#444",
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: "MontserratRegular",
    },
});
