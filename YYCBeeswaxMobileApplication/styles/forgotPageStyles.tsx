import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const forgotPageStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flex: 1,
        alignContent: "space-between",
        backgroundColor: colors.white,
    },
    form: { flex: 1, paddingTop: 10, gap: 20 },
    logo: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    error: {
        color: colors.red,
        alignSelf: "center",
    },
    text: {
        textAlign: "center",
        fontSize: 18,
    },
});
