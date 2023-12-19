import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

export const navbarStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        bottom: "1%",
        position: "absolute",
    },
    optionIcon: {
        fontSize: 34
    }
});
