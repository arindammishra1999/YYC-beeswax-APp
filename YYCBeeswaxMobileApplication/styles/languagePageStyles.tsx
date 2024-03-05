import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const languagePageStyles = StyleSheet.create({
    languageList: {
        flex: 1,
    },
    languageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 35,
        paddingHorizontal: 25,
    },
    languageText: {
        fontSize: 16,
        fontFamily: fonts.main,
    },
    circleTouchable: {
        padding: 10,
    },
    circleButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.yellow,
        marginLeft: "auto",
    },
    yellowCircle: {
        backgroundColor: colors.yellow,
    },
    clearCircle: {
        backgroundColor: "transparent",
    },
    sectionHeader: {
        fontSize: 18,
        marginBottom: 30,
        marginTop: 20,
        paddingLeft: 25,
        fontFamily: fonts.mainBold,
    },
    bottomContainer: {
        justifyContent: "flex-end",
        display: "flex",
        height: "9%",
    },
    bottomButton: {
        backgroundColor: colors.yellow,
        alignSelf: "center",
        width: "65%",
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        position: "absolute",
        bottom: "5%",
    },
    buttonText: {
        fontSize: 21,
        alignSelf: "center",
        fontFamily: fonts.mainBold,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    selectedLanguageText: {
        color: colors.yellow,
    },
});
