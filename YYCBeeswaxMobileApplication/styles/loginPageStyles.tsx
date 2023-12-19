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
});
