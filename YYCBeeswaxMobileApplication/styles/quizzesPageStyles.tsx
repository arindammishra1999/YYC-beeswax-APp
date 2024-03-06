import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";

export const quizzesPageStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    cardSpacing: {
        height: 20,
    },
    card: {
        flexDirection: "row",
        gap: 20,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    imageContainer: {
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: viewportWidth / 4,
        height: viewportWidth / 4,
    },
    imageText: {
        position: "absolute",
        backgroundColor: colors.yellow,
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomLeftRadius: 10,
        fontSize: 10,
        color: "white",
        fontFamily: fonts.main,
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
    },
    textGroup: {
        gap: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: fonts.mainBold,
    },
    subText: {
        fontFamily: fonts.main,
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    countContainer: {
        backgroundColor: colors.yellow,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        color: "white",
        fontFamily: fonts.main,
    },
});
