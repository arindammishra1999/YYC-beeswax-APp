import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const moreOptionsStyles = StyleSheet.create({
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
