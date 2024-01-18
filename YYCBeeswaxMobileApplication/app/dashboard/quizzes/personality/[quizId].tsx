import { router, useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import { db } from "@/firebase/config";
import { mainStyles } from "@/styles/mainStyles";
import { quizPageStyles } from "@/styles/quizPageStyles";

export default function Quiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;

    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [questions, setQuestions] = useState<IPersonalityQuestion[]>([]);

    const [currentIndex, setCurrentIndex] = useState(-1);
    const currentQuestion = questions[currentIndex];

    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
    const [results, setResults] = useState<{ [key: string]: number }>({});

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
                } as IPersonalityQuestion;
            });

            setQuiz(quiz);
            setQuestions(data);

            setResults((prev) => {
                Object.keys(quiz.weights).forEach((weight) => {
                    prev[weight] = 0;
                });
                return { ...prev };
            });
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
                        {currentQuestion.options.map((option, index) => (
                            <Button
                                key={index}
                                style={[
                                    quizPageStyles.answerTextContainer,
                                    selectedAnswerIndex == index
                                        ? quizPageStyles.selectedAnswerTextContainer
                                        : {},
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
                            onPress={() => {
                                setResults((prev) => {
                                    const selectedAnswer =
                                        currentQuestion.options[
                                            selectedAnswerIndex
                                        ].weights;
                                    Object.keys(selectedAnswer).forEach(
                                        (weight) => {
                                            prev[weight] +=
                                                selectedAnswer[weight];
                                        },
                                    );
                                    return { ...prev };
                                });
                                setSelectedAnswerIndex(-1);
                                setCurrentIndex((prev) => prev + 1);
                            }}
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
    const matchDescription = quiz?.weights[match];

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
                <Text style={quizPageStyles.title}>{match}</Text>
                <Text>{matchDescription}</Text>
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
