import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const profilePageStyles = StyleSheet.create({
    button: {
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
    messageText: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 21,
        marginTop: "40%",
        marginLeft: "10%",
        marginRight: "10%",
        fontFamily: fonts.mainBold,
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "5%",
    },
    signUpText: {
        fontSize: 16,
        fontFamily: fonts.main,
    },
    signUpLink: {
        fontSize: 16,
        color: colors.blue,
        textDecorationLine: "underline",
        fontFamily: fonts.main,
    },
    largeIcon: {
        paddingVertical: 25,
        alignSelf: "center",
        fontSize: 100,
    },
    optionIcon: {
        fontSize: 35,
        marginLeft: 10,
    },
    option: {
        paddingVertical: 4,
        flexDirection: "row",
        textAlignVertical: "center",
    },
    optionLabel: {
        alignSelf: "center",
        fontSize: 20,
        marginLeft: 15,
        fontFamily: fonts.main,
    },
    optionContainer: {
        borderRadius: 8,
        borderColor: colors.lightGrey,
        width: "90%",
        alignSelf: "center",
        marginBottom: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        paddingVertical: 5,
        elevation: 3,
    },
});
