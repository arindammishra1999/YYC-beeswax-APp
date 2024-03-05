import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const popupStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: "center",
    },
    popupView: {
        marginHorizontal: 30,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 3,
        width: 350,
        minHeight: 200,
    },
    popupTitle: {
        fontSize: 18,
        paddingTop: "5%",
        textAlign: "center",
        fontFamily: fonts.mainBold,
    },
    popupSubTitle: {
        paddingHorizontal: 40,
        color: colors.black,
        fontSize: 16,
        marginBottom: 30,
        textAlign: "center",
        fontFamily: fonts.main,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        borderRadius: 30,
        paddingVertical: 15,
        backgroundColor: colors.yellow,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTextStyle: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: fonts.mainBold,
    },
    touchableOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
