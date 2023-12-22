import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";


export const loginPageStyles = StyleSheet.create({
    forgot: {
        alignSelf: "center",
        color: colors.blue,
        fontSize: 16,
        textDecorationLine: "underline",
    },
    space: {
        height:20,
    },

    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    bottomContainer: {
        flex: 1,
        justifyContent: "flex-end",

    },
    bottomButton: {
        backgroundColor: colors.yellow,
        alignSelf: "center",
        width: "50%",
        marginVertical: 155,
        paddingVertical:15,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },

});
