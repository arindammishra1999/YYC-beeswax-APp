import { StyleSheet } from "react-native";

import { fonts } from "@/consts/styles";

export const emailVerificationPageStyles = StyleSheet.create({
    icon: {
        paddingVertical: 10,
        alignSelf: "center",
        fontSize: 120,
    },
    heading: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: fonts.main,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: fonts.main,
    },
    buttonsContainer: {
        flex: 1,
        gap: 30,
        justifyContent: "flex-end",
        paddingBottom: 40,
    },
});
