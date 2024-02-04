import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const loginPopupStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: "center",
    },
    popupView: {
        marginHorizontal: 30,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 40,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 3,
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    popupText: {
        paddingHorizontal: 40,
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    buttonContainer: {
        width: 300,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    button: {
        borderRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 15,
        backgroundColor: colors.yellow,
    },
    buttonTextStyle: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
});
