import { StyleSheet } from "react-native";

import { fonts } from "@/consts/styles";

export const inputStyles = StyleSheet.create({
    label: {
        fontSize: 16,
        paddingBottom: 8,
        fontFamily: fonts.mainBold,
    },
    inputContainer: {
        paddingHorizontal: 10,
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        height: 55,
        fontSize: 14,
        fontFamily: fonts.main,
    },
    inputHideable: {
        flex: 1,
        borderRadius: 8,
        height: 55,
        fontSize: 14,
        fontFamily: fonts.main,
    },
});
