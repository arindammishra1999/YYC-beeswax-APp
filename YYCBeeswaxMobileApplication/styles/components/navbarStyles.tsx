import { StyleSheet } from "react-native";

export const navbarStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        bottom: "2.5%",
        position: "absolute",
    },
    optionIcon: {
        fontSize: 38
    }
});
