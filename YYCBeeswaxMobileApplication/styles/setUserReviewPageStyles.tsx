import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const setUserReviewPageStyles = StyleSheet.create({
    text: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontFamily: fonts.mainBold,
    },
    ratingsContainer: {
        height: 40,
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
    },
    textArea: { height: 200 },
    delete: {
        alignSelf: "center",
        color: colors.blue,
        fontSize: 16,
        textDecorationLine: "underline",
        paddingTop: 40,
        fontFamily: fonts.main,
    },
});
