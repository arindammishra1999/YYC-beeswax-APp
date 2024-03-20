import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const loginPageStyles = StyleSheet.create({
    forgot: {
        alignSelf: "center",
        color: colors.blue,
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: fonts.main,
    },

    space: {
        height: 20,
    },

    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginVertical: 20,
        width: "90%",
        alignSelf: "center",
    },
});
