import { StyleSheet } from "react-native";

import { colors, fonts } from "@/consts/styles";

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    center: {
        alignItems: "center",
    },
    centerText: {
        textAlign: "center",
        fontFamily: fonts.main,
    },
    disabled: {
        backgroundColor: "#ffd696",
    },
    bold: {
        fontFamily: fonts.mainBold,
    },
    spinnerOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    flex: { flex: 1 },
    delete: { backgroundColor: "#eb5e68" },
});
