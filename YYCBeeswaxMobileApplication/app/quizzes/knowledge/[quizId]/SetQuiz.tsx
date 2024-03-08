import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import {
    NestableDraggableFlatList,
    NestableScrollContainer,
} from "react-native-draggable-flatlist";

import Button from "@/components/button";
import QuestionCard from "@/components/cards/questionCard";
import Header from "@/components/header";
import Input from "@/components/input";
import { useQuizzesStore } from "@/firebase/store/quizzesStore";
import { accountStyles } from "@/styles/accountStyles";
import { mainStyles } from "@/styles/mainStyles";
import { setQuizPageStyles } from "@/styles/setQuizPageStyles";

export default function SetQuiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;
    const getQuiz = useQuizzesStore((state) => state.getQuiz);
    const updateQuiz = useQuizzesStore((state) => state.updateQuiz);
    const deleteQuiz = useQuizzesStore((state) => state.deleteQuiz);
    const createQuiz = useQuizzesStore((state) => state.createQuiz);
    const quiz = getQuiz<IKnowledgeQuiz>(quizId);

    const [updatedQuiz, setUpdatedQuiz] = useState<IKnowledgeQuiz>(
        quiz ??
            ({
                title: "",
                description: "",
                questions: [],
                type: "Knowledge",
            } as unknown as IKnowledgeQuiz),
    );

    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1);

    const [error, setError] = useState<string>();

    function addQuestion() {
        setUpdatedQuiz((prev) => {
            prev.questions = [
                ...prev.questions,
                {
                    answers: [],
                    question: "Question " + (prev.questions.length + 1),
                    correctAnswer: "True",
                    incorrectAnswer1: "False",
                    incorrectAnswer2: "False",
                    incorrectAnswer3: "False",
                },
            ];
            return { ...prev };
        });
    }

    function deleteQuestion() {
        setSelectedQuestionIndex(-1);
        setUpdatedQuiz((prev) => {
            prev.questions = prev.questions.filter(
                (_, index) => index != selectedQuestionIndex,
            );
            return { ...prev };
        });
    }

    function saveQuiz() {
        setError(undefined);
        if (updatedQuiz.title == "") {
            setError("Error: Title is Empty");
            return;
        }
        if (updatedQuiz.description == "") {
            setError("Error: Description is Empty");
            return;
        }

        if (updatedQuiz.questions.length == 0) {
            setError("Error: Questions are Empty");
            return;
        }
        for (let i = 0; i < updatedQuiz.questions.length; i++) {
            const question = updatedQuiz.questions[i];
            if (question.question == "") {
                setError(`Error: Title of Question ${i + 1} is Empty`);
                return;
            }
            if (question.correctAnswer == "") {
                setError(`Error: Correct Answer of Question ${i + 1} is Empty`);
                return;
            }
            if (question.incorrectAnswer1 == "") {
                setError(
                    `Error: Incorrect Answer 1 of Question ${i + 1} is Empty`,
                );
                return;
            }
            if (question.incorrectAnswer2 == "") {
                setError(
                    `Error: Incorrect Answer 2 of Question ${i + 1} is Empty`,
                );
                return;
            }
            if (question.incorrectAnswer3 == "") {
                setError(
                    `Error: Incorrect Answer 3 of Question ${i + 1} is Empty`,
                );
                return;
            }
        }

        if (quiz) {
            updateQuiz(quizId, updatedQuiz);
        } else {
            createQuiz(updatedQuiz);
        }
        router.back();
    }

    function updateCorrect(value: string) {
        setUpdatedQuiz((prev) => {
            prev = JSON.parse(JSON.stringify(prev));
            prev.questions[selectedQuestionIndex].correctAnswer = value;
            return prev;
        });
    }

    function updateIncorrect(i: number) {
        return (value: string) =>
            setUpdatedQuiz((prev) => {
                prev = JSON.parse(JSON.stringify(prev));
                prev.questions[selectedQuestionIndex][
                    ("incorrectAnswer" + i) as keyof IKnowledgeQuestion
                ] = value as any;
                return prev;
            });
    }

    function updateQuestion(value: string) {
        setUpdatedQuiz((prev) => {
            prev.questions[selectedQuestionIndex].question = value;
            return {
                ...prev,
                questions: prev.questions,
            };
        });
    }

    return (
        <View style={mainStyles.container}>
            <Header header={quiz ? "Edit Quiz" : "Create Quiz"} />
            <NestableScrollContainer
                contentContainerStyle={setQuizPageStyles.container}
            >
                <Input
                    label="Title"
                    value={updatedQuiz.title}
                    onChangeText={(value) =>
                        setUpdatedQuiz((prev) => ({ ...prev, title: value }))
                    }
                    placeholder=""
                    autoCapitalize
                />
                <Input
                    label="Description"
                    value={updatedQuiz?.description}
                    onChangeText={(value) =>
                        setUpdatedQuiz((prev) => ({
                            ...prev,
                            description: value,
                        }))
                    }
                    placeholder=""
                    autoCapitalize
                    multiline
                    inputStyle={setQuizPageStyles.description}
                />
                <View>
                    <Text style={setQuizPageStyles.heading}>Questions</Text>
                    <NestableDraggableFlatList
                        data={updatedQuiz.questions}
                        onDragEnd={({ data }) =>
                            setUpdatedQuiz((prev) => ({
                                ...prev,
                                questions: data,
                            }))
                        }
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) => (
                            <QuestionCard
                                {...item}
                                onEdit={(index) =>
                                    setSelectedQuestionIndex(index)
                                }
                            />
                        )}
                    />
                </View>
                <Text
                    style={[
                        setQuizPageStyles.linkButton,
                        setQuizPageStyles.addButton,
                    ]}
                    onPress={addQuestion}
                >
                    Add Question
                </Text>
                {error && <Text style={accountStyles.error}>{error}</Text>}
                <Button
                    title={quiz ? "Save Changes" : "Create"}
                    onPress={saveQuiz}
                />
                {quiz && (
                    <Button
                        title="Delete Quiz"
                        style={mainStyles.delete}
                        onPress={() => {
                            deleteQuiz(quizId);
                            router.back();
                        }}
                    />
                )}
            </NestableScrollContainer>
            <Modal
                visible={selectedQuestionIndex != -1}
                transparent
                onRequestClose={() => setSelectedQuestionIndex(-1)}
            >
                {selectedQuestionIndex != -1 && (
                    <View style={setQuizPageStyles.modalBackground}>
                        <View style={setQuizPageStyles.modalContainer}>
                            <Text style={setQuizPageStyles.modalHeading}>
                                Editing Question {selectedQuestionIndex + 1}
                            </Text>
                            <Input
                                label="Question"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].question
                                }
                                onChangeText={updateQuestion}
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Correct Answer"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].correctAnswer
                                }
                                onChangeText={updateCorrect}
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Incorrect Option 1"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].incorrectAnswer1
                                }
                                onChangeText={updateIncorrect(1)}
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Incorrect Option 2"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].incorrectAnswer2
                                }
                                onChangeText={updateIncorrect(2)}
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Incorrect Option 3"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].incorrectAnswer3
                                }
                                onChangeText={updateIncorrect(3)}
                                placeholder=""
                                autoCapitalize
                            />
                            <Text
                                style={setQuizPageStyles.linkButton}
                                onPress={deleteQuestion}
                            >
                                Delete Question
                            </Text>
                            <Button
                                title="Confirm"
                                onPress={() => {
                                    setSelectedQuestionIndex(-1);
                                }}
                            />
                        </View>
                    </View>
                )}
            </Modal>
        </View>
    );
}
