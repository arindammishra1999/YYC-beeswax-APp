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
        textAlign: "center",
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
        flexWrap: "wrap",
    },
    answerTextContainer: {
        flexBasis: "45%",
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
        minHeight: 150,
    },
    selectedAnswerTextContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,

        backgroundColor: "#d38e0c",
    },
    correctAnswer: {
        backgroundColor: "#77DD77",
    },
    incorrectAnswer: {
        backgroundColor: "#FF6961",
    },
    answer: {
        fontSize: 18,
        textAlign: "center",
    },
    nextButton: {
        justifyContent: "flex-end",
        flexGrow: 1,
    },
});
