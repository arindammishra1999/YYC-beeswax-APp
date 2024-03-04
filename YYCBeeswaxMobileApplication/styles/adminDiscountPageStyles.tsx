import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";
import { viewportHeight } from "@/consts/viewport";

export const adminDiscountPageStyles = StyleSheet.create({
    spinnerOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    spinnerText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
    },

    codePopupContainer: {
        flex: 1,
        justifyContent: "center",
    },

    touchableOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    popupView: {
        marginHorizontal: 30,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 15,
        justifyContent: "center",
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 3,
        width: viewportHeight * 0.4,
        minHeight: viewportHeight * 0.34,
    },

    header: {
        backgroundColor: colors.white,
        height: 100,
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "flex-end",
    },

    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },

    headerButtonContainer: {
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        marginTop: 10,
    },

    cardContainer: {
        flex: 1,
        width: "90%",
        marginHorizontal: "5%",
        paddingBottom: 20,
        marginBottom: "20%",
        alignItems: "center",
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 15,
        marginVertical: 15,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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
        borderColor: "lightgrey",
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
        height: 55,
        fontSize: 14,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderColor: "lightgrey",
    },

    dropdown: {
        zIndex: 9,
        width: "100%",
        height: 85,
        backgroundColor: colors.white,
        position: "absolute",
        top: 45,
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
