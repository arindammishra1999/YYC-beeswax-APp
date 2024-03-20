import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";
import { viewportHeight } from "@/consts/viewport";

export const totalBillCardStyles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: viewportHeight / 6,
        backgroundColor: colors.white,
        borderRadius: 32,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 40,
    },

    labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 0,
        marginRight: 20,
        marginLeft: 15,
    },

    label: {
        fontSize: 14,
        marginVertical: 6,
        fontFamily: fonts.main,
    },
    value: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: fonts.mainBold,
    },
    totalLabel: {
        fontSize: 18,
        marginTop: 6,
        fontFamily: fonts.mainBold,
    },
    totalValue: {
        fontSize: 18,
        marginBottom: 0,
        fontFamily: fonts.mainBold,
    },

    horizontalLine: {
        borderBottomWidth: 1,
        marginVertical: 6,
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        alignItems: "center",
        padding: 15,
        marginTop: "3%",
        marginLeft: "15%",
        marginRight: "15%",
    },
    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.mainBold,
    },
});
