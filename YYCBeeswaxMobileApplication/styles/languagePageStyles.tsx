import { StyleSheet } from "react-native";
import { colors } from "@/consts/styles";

export const languagePageStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    languageList: {
        flex: 1,
    },
    languageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 35,
        paddingHorizontal: 25,
    },
    languageText: {
        fontSize: 16,
    },
    circleTouchable: {
        padding: 10,
    },
    circleButton: {
        width: 20,
        height: 20,
        borderRadius: 10, // half of width and height to create a circle
        borderWidth: 1,
        borderColor: colors.yellow,
        marginLeft: "auto",
    },
    yellowCircle: {
        backgroundColor: colors.yellow,
    },
    clearCircle: {
        backgroundColor: "transparent",
    },
    sectionHeader: {
        fontSize: 18,
        marginBottom: 30,
        fontWeight: "bold",
        marginTop: 20,
        paddingLeft: 25,
    },
    bottomContainer: {
        justifyContent: "flex-end",
        display: "flex",
        height: "9%",
    },
    bottomButton: {
        backgroundColor: colors.yellow,
        alignSelf: "center",
        width: "65%",
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        position: "absolute",
        bottom: "5%",
    },
    buttonText: {
        fontSize: 21,
        fontWeight: "bold",
        alignSelf: "center",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});
