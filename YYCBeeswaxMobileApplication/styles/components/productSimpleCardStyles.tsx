import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";

export const productSimpleCardStyles = StyleSheet.create({
    cardContainer: {
        width: viewportWidth / 2 - 30,
        height: viewportWidth / 2 + 30,
        margin: 15,
        justifyContent: "center",
    },
    image: {
        width: viewportWidth / 2 - 30,
        height: viewportWidth / 2 - 30,
        top: -10,
    },
    title: {
        fontSize: 14,
        color: colors.darkGrey,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.black,
        paddingBottom: 20,
    },
});
