import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const setQuizPageStyles = StyleSheet.create({
    container: { gap: 10, padding: 10 },
    description: { height: 150 },
    heading: {
        paddingHorizontal: 10,
        fontWeight: "bold",
        fontSize: 16,
    },
    linkButton: {
        alignSelf: "center",
        color: colors.blue,
        fontSize: 16,
        textDecorationLine: "underline",
    },
    addButton: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    modalBackground: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    modalContainer: {
        elevation: 8,
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        borderRadius: 30,
        gap: 20,
        width: "95%",
    },
    modalHeading: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        paddingTop: 10,
    },
    modalOptionsGap: { gap: 10 },
    modalOptionContainer: {
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: "center",
        gap: 10,
    },
    modalOption: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "lightgray",
        fontSize: 14,
    },
    questionCard: {
        padding: 10,
        elevation: 4,
        margin: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "white",
    },
    questionCardActive: {
        backgroundColor: "lightgray",
    },
    questionCardText: { flex: 1 },
    questionCardIcon: {
        padding: 10,
        transform: [{ translateX: 10 }],
    },
    resultCardText: { flex: 1, paddingLeft: 15 },
});
