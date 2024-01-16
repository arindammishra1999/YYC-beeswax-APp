import { StyleSheet } from "react-native";

import { viewportWidth } from "@/consts/viewport";

export const quizPageStyles = StyleSheet.create({
    image: {
        width: viewportWidth,
        height: viewportWidth,
    },
    container: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        gap: 20,
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        fontSize: 32,
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    stats: {
        alignItems: "center",
    },
    questionImageContainer: {
        alignItems: "center",
    },
    questionImage: {
        width: viewportWidth / 2,
        height: viewportWidth / 3,
        borderRadius: 20,
    },
    questionTitle: {
        fontWeight: "bold",
        fontSize: 24,
    },
    answerContainer: {
        flexDirection: "row",
        gap: 20,
    },
    answerTextContainer: {
        flex: 1,
        flexWrap: "wrap",
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignContent: "center",
    },
    selectedAnswerTextContainer: {
        flex: 1,
        flexWrap: "wrap",
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 8,
    },
    answer: {
        fontSize: 18,
        textAlign: "center",
    },
    nextButton: {
        justifyContent: "center",
        flexGrow: 1,
    },
});
