import { StyleSheet } from "react-native";

import { colors } from "@/consts/styles";

export const cartPopUpStyles = StyleSheet.create({
    background: {
        backgroundColor: colors.grey,
        width: "100%",
        height: "100%",
        zIndex: 14,
        opacity: 0.25,
    },
    container: {
        width: 350,
        height: 150,
        alignSelf: "center",
        alignItems: "center",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        elevation: 3,
        borderRadius: 20,
        marginRight: 20,
        marginTop: "60%",
        zIndex: 12,
        justifyContent: "space-between",
        paddingVertical: 10,
        position: "absolute",
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: "5%",
        textAlign: "center",
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: "row",
        paddingVertical: "6%",
        justifyContent: "space-around",
    },
});
