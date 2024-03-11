import { StyleSheet } from "react-native";

import { fonts } from "@/consts/styles";

export const reviewCardStyles = StyleSheet.create({
    container: {
        gap: 5,
    },
    headingContainer: {
        flexDirection: "row",
        gap: 20,
    },
    ratingsContainer: {
        height: 20,
        flexDirection: "row",
        gap: 4,
        justifyContent: "flex-start",
    },
    username: { fontSize: 16, fontFamily: fonts.main },
    date: {
        flex: 1,
        textAlign: "right",
        fontFamily: fonts.main,
    },
    title: { fontSize: 20, fontFamily: fonts.main },
});
