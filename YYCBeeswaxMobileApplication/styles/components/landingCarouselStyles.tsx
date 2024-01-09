import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

export const landingCarouselStyles = StyleSheet.create({
    option: {
        justifyContent: "center",
        alignItems: "center",
        height: 300,
        backgroundColor: colors.white,
    },
    caption: {
        paddingTop: "5%",
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.yellow,
    },
    inactiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.lightGrey,
    },
    pagination: {
        paddingTop: 5,
        marginBottom: "5%",
    },
});
