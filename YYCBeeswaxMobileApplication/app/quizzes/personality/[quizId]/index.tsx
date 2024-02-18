import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import { QuizEndScreen } from "@/components/quiz/quizEndScreen";
import { QuizStartScreen } from "@/components/quiz/quizStartScreen";
import { useQuizzesStore } from "@/firebase/store/quizzesProvider";
import { useUnsavedChangesCheck } from "@/lib/hooks/useUnsavedChangesCheck";
import { mainStyles } from "@/styles/mainStyles";
import { quizPageStyles } from "@/styles/quizPageStyles";

const TMP_IMG =
    "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7";

export default function Quiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;
    const { getQuiz, playQuiz } = useQuizzesStore();
    const quiz = getQuiz(quizId) as IPersonalityQuiz;

    const [currentIndex, setCurrentIndex] = useState(-1);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
    const [results, setResults] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        setResults((prev) => {
            Object.keys(quiz.weights).forEach((weight) => {
                prev[weight] = 0;
            });
            return { ...prev };
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
        const selectedAnswer =
            currentQuestion.options[selectedAnswerIndex].weights;
        setResults((prev) => {
            Object.keys(selectedAnswer).forEach((weight) => {
                prev[weight] += selectedAnswer[weight];
            });
            return { ...prev };
        });
        setSelectedAnswerIndex(-1);
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
                        {currentQuestion.options.map((option, index) => (
                            <Button
                                key={index}
                                style={[
                                    quizPageStyles.answerTextContainer,
                                    selectedAnswerIndex == index &&
                                        quizPageStyles.selectedAnswerTextContainer,
                                ]}
                                textStyle={quizPageStyles.answer}
                                title={option.value}
                                onPress={() => setSelectedAnswerIndex(index)}
                            />
                        ))}
                    </View>
                    <View style={quizPageStyles.nextButton}>
                        <Button
                            title="Next"
                            onPress={onNext}
                            style={
                                selectedAnswerIndex == -1 && mainStyles.disabled
                            }
                            disabled={selectedAnswerIndex == -1}
                        />
                    </View>
                </View>
            </View>
        );
    }

    const sorted = Object.entries(results).sort(
        (prev, next) => prev[1] - next[1],
    );
    const match = (sorted.pop() as [string, number])[0];
    const matchDescription = quiz?.weights[match] ?? "";

    return (
        <QuizEndScreen
            title={match}
            description={matchDescription}
            imageURI={TMP_IMG}
            onEnd={onEnd}
        />
    );
}
