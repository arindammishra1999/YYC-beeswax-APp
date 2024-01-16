import { router, useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import { db } from "@/firebase/config";
import { mainStyles } from "@/styles/mainStyles";
import { quizPageStyles } from "@/styles/quizPageStyles";

interface IQuiz {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    count: number;
}

interface IQuestion {
    id: string;
    question: string;
    difficulty: string;
    correctAnswer: string;
    incorrectAnswer1: string;
    incorrectAnswer2: string;
    incorrectAnswer3: string;
    answers: string[];
}

export default function Quiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;

    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    const [currentIndex, setCurrentIndex] = useState(-1);
    const currentQuestion = questions[currentIndex];

    const [selectedAnswer, setSelectedAnswer] = useState(-1);

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
                } as IQuestion;
            });

            data.forEach((question) => {
                question.answers = [
                    question.correctAnswer,
                    question.incorrectAnswer1,
                    question.incorrectAnswer2,
                    question.incorrectAnswer3,
                ];
            });

            quiz.count = data.length;

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
                            <Text>2</Text>
                        </View>
                        <View style={quizPageStyles.stats}>
                            <Text>Questions</Text>
                            <Text>{quiz?.count}</Text>
                        </View>
                    </View>
                    <Text>{quiz?.description}</Text>
                    <Button
                        title="Start Quiz"
                        onPress={() => setCurrentIndex(0)}
                    />
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
                        <Button
                            style={
                                selectedAnswer == 0
                                    ? quizPageStyles.selectedAnswerTextContainer
                                    : quizPageStyles.answerTextContainer
                            }
                            textStyle={quizPageStyles.answer}
                            title={currentQuestion.answers[0]}
                            onPress={() => setSelectedAnswer(0)}
                        />
                        <Button
                            style={
                                selectedAnswer == 1
                                    ? quizPageStyles.selectedAnswerTextContainer
                                    : quizPageStyles.answerTextContainer
                            }
                            textStyle={quizPageStyles.answer}
                            title={currentQuestion.answers[1]}
                            onPress={() => setSelectedAnswer(1)}
                        />
                    </View>

                    <View style={quizPageStyles.answerContainer}>
                        <Button
                            style={
                                selectedAnswer == 2
                                    ? quizPageStyles.selectedAnswerTextContainer
                                    : quizPageStyles.answerTextContainer
                            }
                            textStyle={quizPageStyles.answer}
                            title={currentQuestion.answers[2]}
                            onPress={() => setSelectedAnswer(2)}
                        />
                        <Button
                            style={
                                selectedAnswer == 3
                                    ? quizPageStyles.selectedAnswerTextContainer
                                    : quizPageStyles.answerTextContainer
                            }
                            textStyle={quizPageStyles.answer}
                            title={currentQuestion.answers[3]}
                            onPress={() => setSelectedAnswer(3)}
                        />
                    </View>
                    {selectedAnswer != -1 && (
                        <View style={quizPageStyles.nextButton}>
                            <Button
                                title="Next"
                                onPress={() => {
                                    setSelectedAnswer(-1);
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
                    Your chakra is pink rock
                </Text>
                <Text>
                    This rock is so pink holy smokes. You are a quirky
                    engineering student.
                </Text>
                <Button
                    title="Back to Quizzes"
                    onPress={() => router.push("/dashboard/quizzes/")}
                />
            </View>
        </View>
    );
}
