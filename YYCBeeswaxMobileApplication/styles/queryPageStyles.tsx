import { StyleSheet, Dimensions } from "react-native";

export const queryPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    display: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    extraSpace: {
        height: Dimensions.get("window").width,
    },
});
