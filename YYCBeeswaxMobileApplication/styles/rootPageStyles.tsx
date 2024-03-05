import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const rootPageStyles = StyleSheet.create({
    imageContainer: {
        alignItems: "center",
        height: "35%",
    },
    image: {
        width: "80%",
        top: "5%",
        flex: 1,
    },
    caption: { height: 300 },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        gap: 10,
        marginBottom: 20,
    },
    button: {
        flex: 1,
    },
    textGroup: {
        flexDirection: "row",
        justifyContent: "center",
    },
    signupLinkText: {
        paddingLeft: 5,
        fontSize: 16,
        color: colors.blue,
        textDecorationLine: "underline",
        fontFamily: fonts.main,
    },
    signupText: {
        fontSize: 16,
        fontFamily: fonts.main,
    },
});
