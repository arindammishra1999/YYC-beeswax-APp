import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const progressBarStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: 10,
        backgroundColor: "lightgray",
        borderRadius: 99,
        overflow: "hidden",
    },
    progress: {
        backgroundColor: colors.yellow,
        height: "100%",
    },
});
