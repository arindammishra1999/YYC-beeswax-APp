import { StyleSheet } from "react-native";

import { fonts } from "@/consts/styles";

export const reviewsStyles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-around",
        paddingTop: 20,
        paddingBottom: 20,
    },
    barsContainer: {
        width: "50%",
        justifyContent: "space-between",
    },
    barContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    circleContainer: {
        width: "35%",
        aspectRatio: 1,
    },
    avgText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        top: "20%",
        fontSize: 40,
        fontFamily: fonts.mainBold,
    },
    countText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        top: "60%",
        fontSize: 12,
        fontFamily: fonts.main,
    },
    userReviewHeading: {
        fontSize: 20,
        paddingBottom: 10,
        fontFamily: fonts.mainBold,
    },
    button: { marginVertical: 20 },
    noReviewText: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 16,
        fontFamily: fonts.mainBold,
    },
    customerReviewHeading: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: fonts.mainBold,
    },
    reviewContainer: { paddingTop: 20 },
});
