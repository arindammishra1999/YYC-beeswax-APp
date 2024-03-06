import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const privacyPolicyPageStyles = StyleSheet.create({
    textContainer: {
        padding: 25,
    },
    bodyText: {
        fontSize: 16,
        fontFamily: fonts.main,
    },
    headerText: {
        fontSize: 22,
        fontFamily: fonts.main,
    },
    linkText: {
        fontSize: 16,
        color: colors.blue,
        textDecorationLine: "underline",
        fontFamily: fonts.main,
    },
});
