import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

export const navbarStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        bottom: "1%",
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
    },
    divider: {
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGrey,
        marginBottom: "2%",
    },
    optionIcon: {
        fontSize: 34
    }
});
