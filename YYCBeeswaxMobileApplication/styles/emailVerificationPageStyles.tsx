import { StyleSheet } from "react-native";

export const emailVerificationPageStyles = StyleSheet.create({
    icon: {
        paddingVertical: 10,
        alignSelf: "center",
        fontSize: 120,
    },
    heading: {
        fontSize: 18,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
    },
    buttonsContainer: {
        flex: 1,
        gap: 30,
        justifyContent: "flex-end",
        paddingBottom: 40,
    },
});
