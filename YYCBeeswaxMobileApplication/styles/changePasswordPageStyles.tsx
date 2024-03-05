import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const changePasswordPageStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: "center",
    },
    popupContainer: {
        backgroundColor: colors.white,
        marginHorizontal: 30,
        padding: 40,
        gap: 20,
        borderRadius: 20,
        elevation: 3,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    popupText: {
        color: colors.black,
        fontSize: 16,
        textAlign: "center",
        fontFamily: fonts.mainBold,
    },
});
