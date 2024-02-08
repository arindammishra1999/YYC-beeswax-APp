import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const setUserReviewPageStyles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 8,
        paddingHorizontal: 10,
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
    },
});