import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportHeight, viewportWidth } from "@/consts/viewport";

export const navbarStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        bottom: "0%",
        position: "absolute",
        width: "100%",
    },
    optionContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
    },
    optionIcon: {
        fontSize: 34,
    },
    optionHitbox: {
        height: viewportHeight / 13,
        width: viewportWidth / 4,
        alignItems: "center",
        justifyContent: "center",
    },
});
