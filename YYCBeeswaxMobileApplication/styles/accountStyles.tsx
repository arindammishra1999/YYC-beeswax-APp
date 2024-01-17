import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const accountStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flex: 1,
        alignContent: "space-between",
    },
    form: { flex: 1, paddingTop: 10, gap: 20, paddingHorizontal: 10 },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
    },
    header: {
        fontSize: 20,
        alignSelf: "center",
    },
    textInput: {
        fontSize: 18,
        color: colors.darkGrey,
        flex: 1,
    },
    inputContainer: {
        backgroundColor: colors.darkWhite,
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },
    error: {
        color: colors.red,
        alignSelf: "center",
    },
});
