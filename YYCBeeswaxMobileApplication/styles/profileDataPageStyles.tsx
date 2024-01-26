import { StyleSheet } from "react-native";

export const profileDataPageStyles = StyleSheet.create({
    mainContainer: {
        padding: 20,
    },
    dataContainer: {
        gap: 5,
        paddingBottom: 30,
    },
    buttonContainer: {
        paddingTop: 30,
        gap: 20,
    },
    mainText: {
        fontWeight: "bold",
        fontSize: 20,
        paddingTop: 20,
    },
    text: {
        fontSize: 18,
    },
    emailContainer: {
        backgroundColor: "white",
    },
    verifiedText: {
        paddingTop: 5,
        fontSize: 18,
        color: "green",
    },
    notVerifiedText: {
        paddingTop: 5,
        fontSize: 18,
        color: "red",
    },
});
