import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        flex: 0.8,
        textAlign: "center",
    },
    backButton: { position: "absolute", left: 10 },
});
