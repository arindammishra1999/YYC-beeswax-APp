import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

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
        paddingHorizontal: "5%",
        paddingTop: "2%",
        borderTopWidth: 0.5,
    },
    optionIcon: {
        fontSize: 34,
    },
});
