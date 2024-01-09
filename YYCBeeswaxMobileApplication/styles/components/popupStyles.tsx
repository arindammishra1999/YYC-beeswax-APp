import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

export const popupStyles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: "center",
    },
    popupView: {
        marginHorizontal: 30,
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingVertical: 40,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 3,
        zIndex: 12,
        width: 350,
    },
    popupTitle: {
        paddingHorizontal: 40,
        color: colors.black,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    popupSubTitle: {
        paddingHorizontal: 40,
        color: colors.black,
        fontSize: 16,
        marginBottom: 30,
        textAlign: "center",
    },
    buttonContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: "6%",
    },
    button: {
        borderRadius: 30,
        paddingHorizontal: 50,
        paddingVertical: 15,
        backgroundColor: colors.yellow,
        maxWidth: "50%",
    },
    buttonTextStyle: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
    touchableOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
