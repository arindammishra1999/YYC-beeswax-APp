import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportHeight, viewportWidth } from "@/consts/viewport";

export const productPageStyles = StyleSheet.create({
    display: {
        flexDirection: "column",
        alignItems: "center",
    },
    image: {
        width: viewportWidth,
        height: viewportWidth,
    },
    productDetails: {
        width: "100%",
        top: -20,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    productHeadingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 20,
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
    productPriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    productPrice: {
        fontSize: 30,
        alignSelf: "flex-start",
        fontWeight: "bold",
        color: colors.blue,
    },
    productVariantsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    productVariantsTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    productDropdown: {
        width: 100,
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
    },
    productDropdownText: {
        fontSize: 14,
    },
    productDescription: {
        color: colors.grey,
        paddingTop: 10,
        fontSize: 14,
    },
    bottomSection: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: viewportHeight / 10,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, .2)",
        borderStyle: "solid",
        borderWidth: 1,
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
