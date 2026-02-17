import { StyleSheet } from "react-native";

export default StyleSheet.create({
    item: {
        backgroundColor: "white",
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    address: {
        color: "#666",
        marginBottom: 2,
    },
    phone: {
        color: "#666",
    },
});
