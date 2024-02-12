import { StyleSheet } from "react-native";

export const reviewCardStyles = StyleSheet.create({
    container: {
        gap: 5,
    },
    headingContainer: {
        flexDirection: "row",
        gap: 20,
    },
    ratingsContainer: {
        height: 20,
        flexDirection: "row",
        gap: 4,
        justifyContent: "flex-start",
    },
    username: { fontSize: 16 },
    date: {
        flex: 1,
        textAlign: "right",
    },
    title: { fontSize: 20 },
});
