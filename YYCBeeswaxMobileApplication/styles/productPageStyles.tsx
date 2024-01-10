import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportWidth, viewportHeight } from "@/consts/viewport";
export const productPageStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    display: {
        flexDirection: "column",
        alignItems: "center",
    },
    image: {
        width: viewportWidth,
        height: viewportWidth,
    },
    productDetails: {
        top: -20,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    productName: {
        paddingTop: 20,
        fontSize: 20,
        alignSelf: "flex-start",
        fontWeight: "bold",
    },

    productShortDescription: {
        color: colors.grey,
        fontSize: 12,
    },
    productQuantitySection: {
        alignSelf: "flex-end",
        flexDirection: "row",
        gap: 10,
    },
    productQuantity: {
        fontSize: 18,
    },
    quantityButton: {
        backgroundColor: colors.yellow,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 25,
    },
    quantityButtonText: {
        color: colors.black,
        fontSize: 18,
    },

    productNavBar: {
        flexDirection: "row",
        gap: 40,
    },
    productNavBarSelected: {
        color: colors.blue,
        fontSize: 16,
    },
    productNavBarUnselected: {
        color: colors.grey,
        fontSize: 16,
    },
    productPrice: {
        fontSize: 30,
        alignSelf: "flex-start",
        fontWeight: "bold",
        color: colors.blue,
    },
    productDescription: {
        color: colors.grey,
        paddingTop: 10,
        fontSize: 14,
    },
    bottomSection: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: viewportHeight / 8,
        backgroundColor: colors.white,
        borderColor: colors.darkGrey,
        borderStyle: "solid",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: viewportWidth / 2,
        marginLeft: "25%",
        marginRight: "25%",
    },
    buttonText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: "bold",
    },
});
