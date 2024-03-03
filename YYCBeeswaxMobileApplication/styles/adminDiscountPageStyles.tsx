import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const adminDiscountPageStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        width: "90%",
        marginHorizontal: "5%",
        paddingBottom: 20,
        alignItems: "center",
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 15,
        marginVertical: 15,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    bottom: {
        marginBottom: "20%",
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "100%",
        paddingHorizontal: 20,
    },

    itemTitle: {
        fontSize: 18,
    },

    subDiscountRowContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },

    icon: {
        fontSize: 22,
    },

    inputContainer: {
        paddingHorizontal: 10,
        flex: 1,
        alignItems: "center",
    },

    codeInput: {
        width: "95%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        height: 55,
        fontSize: 14,
        paddingHorizontal: 15,
        marginVertical: 5,
    },

    subInputContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        alignItems: "center",
    },

    amountInput: {
        width: "50%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        height: 55,
        fontSize: 14,
        paddingHorizontal: 15,
        marginVertical: 5,
    },

    dropdown: {
        zIndex: 9,
        width: "100%",
        height: 85,
        backgroundColor: colors.white,
    },

    button: {
        backgroundColor: colors.yellow,
        alignSelf: "center",
        width: "95%",
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        marginTop: 20,
        zIndex: -1,
    },
    buttonDisabled: {
        opacity: 0.5,
        zIndex: -1,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
});
