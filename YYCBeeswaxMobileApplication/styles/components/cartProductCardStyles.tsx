import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const cartProductCardStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: "row",
        width: "85%",
        padding: 15,
        marginBottom: 10,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 10,
        alignSelf: "center",
    },
    image: {
        height: 85,
        width: 85,
        contentFit: "cover",
        borderRadius: 10,
    },
    infoContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: 20,
        maxWidth: "68%",
    },
    title: {
        width: "100%",
        flex: 1,
        fontSize: 16,
        color: colors.darkGrey,
        flexWrap: "wrap",
        fontFamily: fonts.mainBold,
    },

    subInfoContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
    },
    price: {
        fontSize: 18,
        color: colors.black,
        marginRight: 25,
        fontFamily: fonts.mainBold,
    },
    productQuantitySection: {
        alignSelf: "flex-end",
        flexDirection: "row",
        gap: 12,
    },
    productQuantity: {
        fontSize: 16,
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
    variantsContainer: {
        flexDirection: "column",
        width: "70%",
    },
    variantsTitle: {
        fontFamily: fonts.mainBold,
    },
    variantsType: {
        fontFamily: fonts.main,
    },
});
