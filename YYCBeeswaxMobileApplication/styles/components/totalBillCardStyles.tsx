import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const totalBillCardStyles = StyleSheet.create({
    cardContainer: {
        width: "90%",
        padding: 20,
        marginBottom: 0,
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: colors.white,
        shadowColor: "#000",
        elevation: 5,
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
