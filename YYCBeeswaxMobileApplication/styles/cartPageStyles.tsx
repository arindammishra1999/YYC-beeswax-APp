import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const cartPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
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
});
