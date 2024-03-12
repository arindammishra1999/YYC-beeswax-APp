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
        width: "110%",
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
    productPriceVariantsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 15,
        borderWidth: 1,
        borderColor: colors.white,
        width: "100%",
    },
    productPrice: {
        fontSize: 30,
        color: colors.blue,
        fontFamily: fonts.mainBold,
        borderWidth: 1,
        borderColor: colors.white,
        width: "35%",
    },
    productVariantsContainer: {
        flexDirection: "column",
        width: "65%",
    },
    variantContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.white,
        paddingBottom: 10,
    },
    variantTitle: {
        fontSize: 16,
        fontFamily: fonts.mainBold,
        width: "40%",
        borderWidth: 1,
        borderColor: colors.white,
    },
    variantDropdown: {
        width: "55%",
        paddingVertical: 0,
        paddingHorizontal: 10,
        marginTop: 10,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        height: 50,
    },
    variantDropdownText: {
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
