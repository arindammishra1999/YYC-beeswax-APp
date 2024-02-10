import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const totalBillCardStyles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        padding: 20,
        paddingBottom: 70,
        backgroundColor: colors.white,
        borderRadius: 50,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 40,
        alignSelf: "center",
    },

    labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        marginRight: 20,
        marginLeft: 15,
    },

    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 0,
    },

    horizontalLine: {
        borderBottomWidth: 1,
        marginVertical: 8,
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        alignItems: "center",
        padding: 15,
        marginTop: "5%",
        marginLeft: "15%",
        marginRight: "15%",
    },
    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
});
