import { StyleSheet, Dimensions } from "react-native";

import { colors } from "@/consts/styles";

export const productSimpleCardStyles = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get("window").width / 2 - 30,
        height: Dimensions.get("window").width / 2 + 30,
        margin: 15,
        justifyContent: "center",
    },
    image: {
        width: Dimensions.get("window").width / 2 - 30,
        height: Dimensions.get("window").width / 2 - 30,
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
