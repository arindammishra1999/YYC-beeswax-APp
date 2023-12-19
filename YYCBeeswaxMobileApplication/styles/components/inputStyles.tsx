import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 8,
    },
    inputContainer: {
        paddingHorizontal: 10,
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        height: 55,
        fontSize: 14,
    },
    inputHideable: {
        flex: 1,
        borderRadius: 8,
        height: 55,
        fontSize: 14,
    },
});
