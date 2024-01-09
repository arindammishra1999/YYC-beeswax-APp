import { StyleSheet } from "react-native";
import { colors } from "../consts/styles";

export const privacyPolicyPageStyles = StyleSheet.create({
    textContainer: {
        padding: 25,
    },
    bodyText: {
        fontSize: 16,
    },
    headerText: {
        fontSize: 22,
    },
    linkText: {
        fontSize: 16,
        color: colors.blue,
        textDecorationLine: "underline",
    },
});
