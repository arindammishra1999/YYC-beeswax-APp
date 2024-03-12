import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";
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
        gap: 20,
    },
    productTitleSection: { flex: 1 },
    productName: {
        paddingTop: 20,
        fontSize: 20,
        alignSelf: "flex-start",
        fontFamily: fonts.mainBold,
    },
    productShortDescription: {
        color: colors.grey,
        fontSize: 12,
        fontFamily: fonts.main,
    },
    productQuantitySection: {
        alignSelf: "flex-end",
        flexDirection: "row",
        gap: 10,
    },
    productQuantity: {
        fontSize: 18,
        alignSelf: "center",
        fontFamily: fonts.main,
    },
    quantityButton: {
        backgroundColor: colors.yellow,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 35,
    },
    quantityButtonText: {
        color: colors.black,
        fontSize: 18,
        fontFamily: fonts.main,
    },

    productNavBar: {
        flexDirection: "row",
        gap: 40,
    },
    productNavBarSelected: {
        color: colors.blue,
        fontSize: 16,
        fontFamily: fonts.main,
    },
    productNavBarUnselected: {
        color: colors.grey,
        fontSize: 16,
        fontFamily: fonts.main,
    },
    productPriceContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 15,
    },
    productPrice: {
        fontSize: 30,
        color: colors.blue,
        fontFamily: fonts.mainBold,
    },
    productVariantsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: viewportWidth * 0.7,
    },
    productVariantsTitle: {
        fontSize: 16,
        fontFamily: fonts.mainBold,
        width: viewportWidth * 0.3,
        marginLeft: 10,
    },
    productDropdown: {
        width: viewportWidth * 0.33,
        paddingVertical: 0,
        paddingHorizontal: 10,
        marginTop: 10,
        marginRight: 15,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
    },
    productDropdownText: {
        fontSize: 14,
        fontFamily: fonts.main,
    },
    productDescription: {
        color: colors.grey,
        paddingTop: 10,
        fontSize: 14,
        fontFamily: fonts.main,
    },
    bottomSection: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: viewportHeight / 9,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, .2)",
        borderStyle: "solid",
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: viewportWidth * 0.7,
        marginLeft: "25%",
        marginRight: "25%",
    },
    buttonText: {
        color: colors.black,
        fontSize: 20,
        fontFamily: fonts.mainBold,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});
