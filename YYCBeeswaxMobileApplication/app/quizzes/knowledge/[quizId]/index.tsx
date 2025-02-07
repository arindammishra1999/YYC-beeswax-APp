import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import { QuizEndScreen } from "@/components/quiz/quizEndScreen";
import { QuizStartScreen } from "@/components/quiz/quizStartScreen";
import { useQuizzesStore } from "@/firebase/store/quizzesStore";
import { useUnsavedChangesCheck } from "@/lib/hooks/useUnsavedChangesCheck";
import { shuffleArray } from "@/lib/utility";
import { mainStyles } from "@/styles/mainStyles";
import { quizPageStyles } from "@/styles/quizPageStyles";

const TMP_IMG =
    "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7";

export default function Quiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;
    const getQuiz = useQuizzesStore((state) => state.getQuiz);
    const playQuiz = useQuizzesStore((state) => state.playQuiz);
    const quiz = getQuiz(quizId) as IKnowledgeQuiz;

    const [currentIndex, setCurrentIndex] = useState(-1);
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [confirm, setConfirm] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        quiz.questions.forEach((question) => {
            question.answers = [
                question.correctAnswer,
                question.incorrectAnswer1,
                question.incorrectAnswer2,
                question.incorrectAnswer3,
            ];
            shuffleArray(question.answers);
        });
    }, []);

    useUnsavedChangesCheck(
        currentIndex == -1 || currentIndex >= (quiz?.questions.length ?? 0),
    );

    const currentQuestion = quiz.questions[currentIndex];

    function onStart() {
        setCurrentIndex(0);
    }

    function onEnd() {
        playQuiz(quizId);
        router.back();
    }

    function onNext() {
        if (
            currentQuestion.correctAnswer ==
            currentQuestion.answers[selectedAnswer]
        ) {
            setCorrectCount((prev) => prev + 1);
        }
        setSelectedAnswer(-1);
        setConfirm(false);
        setCurrentIndex((prev) => prev + 1);
    }

    if (currentIndex == -1) {
        return (
            <QuizStartScreen quiz={quiz} onStart={onStart} imageURI={TMP_IMG} />
        );
    }

    if (currentIndex < quiz.questions.length) {
        return (
            <View style={mainStyles.container}>
                <Header
                    header={`${currentIndex + 1}/${quiz.questions.length}`}
                />
                <View style={quizPageStyles.container}>
                    <View style={quizPageStyles.questionImageContainer}>
                        <Image
                            contentFit="cover"
                            source={{
                                uri: TMP_IMG,
                            }}
                            style={quizPageStyles.questionImage}
                        />
                    </View>
                    <Text style={quizPageStyles.questionTitle}>
                        {currentQuestion.question}
                    </Text>

                    <View style={quizPageStyles.answerContainer}>
                        {currentQuestion.answers.map((answer, index) => (
                            <Button
                                key={index}
                                style={[
                                    quizPageStyles.answerTextContainer,
                                    selectedAnswer == index &&
                                        quizPageStyles.selectedAnswerTextContainer,
                                    confirm &&
                                        (currentQuestion.correctAnswer == answer
                                            ? quizPageStyles.correctAnswer
                                            : quizPageStyles.incorrectAnswer),
                                ]}
                                disabled={confirm}
                                textStyle={quizPageStyles.answer}
                                title={answer}
                                onPress={() => setSelectedAnswer(index)}
                            />
                        ))}
                    </View>

                    {!confirm ? (
                        <View style={quizPageStyles.nextButton}>
                            <Button
                                title="Confirm"
                                onPress={() => {
                                    setConfirm(true);
                                }}
                                style={
                                    selectedAnswer == -1 && mainStyles.disabled
                                }
                                disabled={selectedAnswer == -1}
                            />
                        </View>
                    ) : (
                        <View style={quizPageStyles.nextButton}>
                            <Button title="Next" onPress={onNext} />
                        </View>
                    )}
                </View>
            </View>
        );
    }

    return (
        <QuizEndScreen
            title={`Your scored ${correctCount} out of ${quiz.questions.length}`}
            description="Good Job!"
            imageURI={TMP_IMG}
            onEnd={onEnd}
        />
    );
}
