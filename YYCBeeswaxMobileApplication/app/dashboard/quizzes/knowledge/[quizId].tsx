import { router, useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import { db } from "@/firebase/config";
import { shuffleArray } from "@/lib/utility";
import { mainStyles } from "@/styles/mainStyles";
import { quizPageStyles } from "@/styles/quizPageStyles";

export default function Quiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;

    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [questions, setQuestions] = useState<IKnowledgeQuestion[]>([]);

    const [currentIndex, setCurrentIndex] = useState(-1);
    const currentQuestion = questions[currentIndex];

    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [confirm, setConfirm] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        (async () => {
            const docSnap = await getDoc(doc(db, "quizzes", quizId));
            const quiz = {
                id: docSnap.id,
                ...docSnap.data(),
            } as IQuiz;

            const query = await getDocs(
                collection(db, "quizzes", quiz.id, "questions"),
            );
            const data = query.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                } as IKnowledgeQuestion;
            });

            data.forEach((question) => {
                question.answers = [
                    question.correctAnswer,
                    question.incorrectAnswer1,
                    question.incorrectAnswer2,
                    question.incorrectAnswer3,
                ];
                shuffleArray(question.answers);
            });

            setQuiz(quiz);
            setQuestions(data);
        })();
    }, []);

    if (currentIndex == -1) {
        return (
            <View style={mainStyles.container}>
                <Header header="Quiz" />
                <Image
                    resizeMode="contain"
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7",
                    }}
                    style={quizPageStyles.image}
                />
                <View style={quizPageStyles.container}>
                    <Text style={quizPageStyles.title}>{quiz?.title}</Text>
                    <View style={quizPageStyles.details}>
                        <View style={quizPageStyles.stats}>
                            <Text>Played</Text>
                            <Text>{quiz?.plays}</Text>
                        </View>
                        <View style={quizPageStyles.stats}>
                            <Text>Questions</Text>
                            <Text>{quiz?.count}</Text>
                        </View>
                    </View>
                    <Text>{quiz?.description}</Text>
                    <View style={quizPageStyles.nextButton}>
                        <Button
                            title="Start Quiz"
                            onPress={() => setCurrentIndex(0)}
                        />
                    </View>
                </View>
            </View>
        );
    }

    if (currentIndex < questions.length) {
        return (
            <View style={mainStyles.container}>
                <Header
                    header={`${currentIndex + 1}/${questions.length}`}
                    noBackArrow
                />
                <View style={quizPageStyles.container}>
                    <View style={quizPageStyles.questionImageContainer}>
                        <Image
                            resizeMode="cover"
                            source={{
                                uri: "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7",
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
                                    selectedAnswer == index
                                        ? quizPageStyles.selectedAnswerTextContainer
                                        : {},
                                    !confirm
                                        ? {}
                                        : currentQuestion.correctAnswer ==
                                            answer
                                          ? quizPageStyles.correctAnswer
                                          : quizPageStyles.incorrectAnswer,
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
                                    selectedAnswer == -1
                                        ? mainStyles.disabled
                                        : {}
                                }
                                disabled={selectedAnswer == -1}
                            />
                        </View>
                    ) : (
                        <View style={quizPageStyles.nextButton}>
                            <Button
                                title="Next"
                                onPress={() => {
                                    if (
                                        currentQuestion.correctAnswer ==
                                        currentQuestion.answers[selectedAnswer]
                                    ) {
                                        setCorrectCount((prev) => prev + 1);
                                    }
                                    setSelectedAnswer(-1);
                                    setConfirm(false);
                                    setCurrentIndex((prev) => prev + 1);
                                }}
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    }

    return (
        <View style={mainStyles.container}>
            <Header header="Quiz Results" />
            <Image
                resizeMode="contain"
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7",
                }}
                style={quizPageStyles.image}
            />
            <View style={quizPageStyles.container}>
                <Text style={quizPageStyles.title}>
                    Your scored {correctCount} out of {quiz?.count}
                </Text>
                <Text>Good job!</Text>
                <View style={quizPageStyles.nextButton}>
                    <Button
                        title="Back to Quizzes"
                        onPress={() => router.push("/dashboard/quizzes/")}
                    />
                </View>
            </View>
        </View>
    );
}
