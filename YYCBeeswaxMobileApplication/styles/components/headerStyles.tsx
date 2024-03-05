import { StyleSheet } from "react-native";

import { fonts } from "@/consts/styles";

export const headerStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
    },
    headerText: {
        fontSize: 22,
        flex: 0.8,
        textAlign: "center",
        fontFamily: fonts.mainBold,
    },
    backButton: { position: "absolute", left: 10 },
});
