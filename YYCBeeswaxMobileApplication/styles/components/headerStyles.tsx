import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: 15,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        width: "85%",
    },
    backButton: { position: "absolute", left: 10 },
});
