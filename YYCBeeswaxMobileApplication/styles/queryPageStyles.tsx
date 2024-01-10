import { StyleSheet } from "react-native";

import { viewportWidth } from "@/consts/viewport";

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
        height: viewportWidth,
    },
});
