import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";

export const cartPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    spinnerOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `rgba(255, 255, 255, 0.5)`,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },

    button: {
        marginTop: "3%",
        width: "80%",
        alignSelf: "center",
    },

    buttonTouchableOpacity: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: "15%",
        marginLeft: "25%",
        marginRight: "25%",
    },

    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.mainBold,
    },

    buttonDisabled: {
        opacity: 0.5,
    },

    discountCodeLink: {
        fontSize: 16,
        color: colors.blue,
        textDecorationLine: "underline",
        fontFamily: fonts.main,
        textAlign: "center",
        marginTop: 10,
    },

    messageText: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 21,
        marginTop: "30%",
        marginLeft: "10%",
        marginRight: "10%",
        fontFamily: fonts.mainBold,
    },

    gif: {
        alignSelf: "center",
        marginTop: 10,
        height: 240,
        width: 320,
    },

    topImageContainer: {
        alignSelf: "center",
        width: 300,
        height: 70,
    },

    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "5%",
    },

    signUpText: {
        fontSize: 16,
    },

    signUpLink: {
        fontSize: 16,
        color: colors.blue,
        textDecorationLine: "underline",
    },

    productsContainer: {
        height: "40%",
    },

    scrollViewContainer: {
        paddingBottom: 100,
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
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 15,
        justifyContent: "center",
        alignSelf: "center",
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 3,
        width: viewportWidth * 0.88,
        height: 230,
    },

    popupHeaderContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "90%",
        paddingVertical: 15,
        marginHorizontal: "5%",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "500",
        paddingBottom: 3.5,
        fontFamily: fonts.main,
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
        fontFamily: fonts.main,
    },

    discountButton: {
        backgroundColor: colors.yellow,
        alignSelf: "center",
        width: "80%",
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        marginTop: 20,
        zIndex: -1,
    },

    discountButtonText: {
        fontSize: 18,
        alignSelf: "center",
        fontFamily: fonts.mainBold,
    },
});
