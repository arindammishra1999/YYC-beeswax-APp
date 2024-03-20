import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TextInput, View } from "react-native";
import {
    DragEndParams,
    NestableDraggableFlatList,
    NestableScrollContainer,
} from "react-native-draggable-flatlist";

import Button from "@/components/button";
import QuestionCard from "@/components/cards/questionCard";
import QuizResultCard from "@/components/cards/quizResultCard";
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
    const quiz = getQuiz<IPersonalityQuiz>(quizId);

    const [updatedQuiz, setUpdatedQuiz] = useState<IPersonalityQuiz>(
        quiz ??
            ({
                title: "",
                description: "",
                questions: [],
                type: "Personality",
            } as unknown as IPersonalityQuiz),
    );

    const [weights, setWeights] = useState(() => {
        const weights = quiz?.weights ?? {};
        return Object.keys(weights).map((weight) => {
            return { name: weight, description: weights[weight] };
        });
    });

    const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
    const [selectedResultName, setSelectedResultName] = useState("");
    const selectedResult = weights[selectedResultIndex];

    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1);
    const selectedQuestion = updatedQuiz.questions[selectedQuestionIndex];

    const [error, setError] = useState<string>();

    function addResult() {
        const name = `Option ${weights.length + 1}`;
        setWeights((prev) => [
            ...prev,
            {
                description: "",
                name,
            },
        ]);
        setUpdatedQuiz((prev) => {
            prev = JSON.parse(JSON.stringify(prev));
            prev.questions.forEach((question) => {
                question.options.forEach((option) => {
                    option.weights[name] = 0;
                });
            });
            return prev;
        });
    }

    function addQuestion() {
        setUpdatedQuiz((prev) => {
            prev.questions = [
                ...prev.questions,
                {
                    question: "Question " + (prev.questions.length + 1),
                    options: [],
                },
            ];
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

        if (weights.length < 2) {
            setError("Error: Minimum of 2 Results are Needed");
            return;
        }
        for (let i = 0; i < weights.length; i++) {
            const weight = weights[i];
            if (weight.name == "") {
                setError(`Error: Name of Option ${i + 1} is Empty`);
                return;
            }
            if (weight.description == "") {
                setError(`Error: Description of Option ${i + 1} is Empty`);
                return;
            }
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
            if (question.options.length < 2) {
                setError(
                    `Error: Minimum of 2 Options for Question ${
                        i + 1
                    } are Needed`,
                );
                return;
            }
        }

        const temp = JSON.parse(
            JSON.stringify(updatedQuiz),
        ) as IPersonalityQuiz;
        temp.weights = {};
        weights.forEach((weight) => {
            temp.weights[weight.name] = weight.description;
        });

        if (quiz) {
            updateQuiz(quizId, temp);
        } else {
            createQuiz(temp);
        }
        router.back();
    }

    function addOption() {
        setUpdatedQuiz((prev) => {
            prev = JSON.parse(JSON.stringify(prev));
            const temp = {
                value: "option",
                weights: {} as {
                    [key: string]: number;
                },
            };
            weights.forEach((weight) => {
                temp.weights[weight.name] = 0;
            });
            const question = prev.questions[selectedQuestionIndex];
            question.options = [...question.options, temp];
            return prev;
        });
    }

    function saveResult() {
        setError("");
        if (
            weights.findIndex(
                (value, index) =>
                    index != selectedResultIndex &&
                    value.name == selectedResultName,
            ) != -1
        ) {
            setError("Error: Duplicate Option Name");
            return;
        }
        const oldName = selectedResult.name;
        if (oldName != selectedResultName) {
            setWeights((prev) => {
                prev[selectedResultIndex].name = selectedResultName;
                return [...prev];
            });
            setUpdatedQuiz((prev) => {
                prev.questions.forEach((question) => {
                    question.options.forEach((option) => {
                        option.weights[selectedResultName] =
                            option.weights[oldName];
                        delete option.weights[oldName];
                    });
                });
                return JSON.parse(JSON.stringify(prev));
            });
        }
        setSelectedResultIndex(-1);
    }

    function deleteResult() {
        setSelectedResultIndex(-1);
        setWeights((prev) => {
            const name = selectedResult.name;
            setUpdatedQuiz((prev) => {
                prev.questions.forEach((question) => {
                    question.options.forEach((option) => {
                        delete option.weights[name];
                    });
                });
                return JSON.parse(JSON.stringify(prev));
            });
            prev = prev.filter((_, index) => index != selectedResultIndex);
            return [...prev];
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

    function updateWeights(value: string, name: string, optionIndex: number) {
        setUpdatedQuiz((prev) => {
            prev = JSON.parse(JSON.stringify(prev));
            prev.questions[selectedQuestionIndex].options[optionIndex].weights[
                name
            ] = parseFloat(value) || 0;
            return prev;
        });
    }

    function handelDeleteQuiz() {
        deleteQuiz(quizId);
        router.back();
    }

    function updateTitle(value: string) {
        setUpdatedQuiz((prev) => ({ ...prev, title: value }));
    }

    function updateDescription(value: string) {
        setUpdatedQuiz((prev) => ({
            ...prev,
            description: value,
        }));
    }

    function updateQuestionsOrder({
        data,
    }: DragEndParams<IPersonalityQuestion>) {
        setUpdatedQuiz((prev) => ({
            ...prev,
            questions: data,
        }));
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
            <Header
                header={
                    quiz ? "Edit Personality Quiz" : "Create Personality Quiz"
                }
            />
            <NestableScrollContainer
                contentContainerStyle={setQuizPageStyles.container}
            >
                <Input
                    label="Title"
                    value={updatedQuiz.title}
                    onChangeText={updateTitle}
                    placeholder=""
                    autoCapitalize
                />
                <Input
                    label="Description"
                    value={updatedQuiz.description}
                    onChangeText={updateDescription}
                    placeholder=""
                    autoCapitalize
                    multiline
                    inputStyle={setQuizPageStyles.description}
                />
                <View>
                    <Text style={setQuizPageStyles.heading}>Results</Text>
                    {weights.map((weight, i) => {
                        return (
                            <QuizResultCard
                                key={i}
                                item={weight}
                                onEdit={() => {
                                    setSelectedResultIndex(i);
                                    setSelectedResultName(weight.name);
                                }}
                            />
                        );
                    })}
                </View>
                <Text
                    style={[
                        setQuizPageStyles.linkButton,
                        setQuizPageStyles.addButton,
                    ]}
                    onPress={addResult}
                >
                    Add Result
                </Text>
                <View>
                    <Text style={setQuizPageStyles.heading}>Questions</Text>
                    <NestableDraggableFlatList
                        data={updatedQuiz.questions}
                        onDragEnd={updateQuestionsOrder}
                        keyExtractor={(item) => item.question}
                        renderItem={(item) => (
                            <QuestionCard
                                {...item}
                                onEdit={setSelectedQuestionIndex}
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
                        onPress={handelDeleteQuiz}
                    />
                )}
            </NestableScrollContainer>
            <Modal
                visible={selectedQuestionIndex != -1}
                transparent
                onRequestClose={() => setSelectedQuestionIndex(-1)}
            >
                {selectedQuestionIndex != -1 && (
                    <ScrollView
                        contentContainerStyle={
                            setQuizPageStyles.modalBackground
                        }
                    >
                        <View style={setQuizPageStyles.modalContainer}>
                            <Text style={setQuizPageStyles.modalHeading}>
                                Editing Question {selectedQuestionIndex + 1}
                            </Text>
                            <Input
                                label="Question"
                                value={selectedQuestion.question}
                                onChangeText={updateQuestion}
                                placeholder=""
                                autoCapitalize
                            />
                            {updatedQuiz.questions[
                                selectedQuestionIndex
                            ].options.map((option, i) => {
                                return (
                                    <View
                                        key={i}
                                        style={
                                            setQuizPageStyles.modalOptionsGap
                                        }
                                    >
                                        <Input
                                            label={"Option " + (i + 1)}
                                            value={option.value}
                                            onChangeText={(value) =>
                                                setUpdatedQuiz((prev) => {
                                                    prev.questions[
                                                        selectedQuestionIndex
                                                    ].options[i].value = value;
                                                    return JSON.parse(
                                                        JSON.stringify(prev),
                                                    );
                                                })
                                            }
                                            placeholder=""
                                            autoCapitalize
                                        />
                                        {weights.map((weight, j) => {
                                            return (
                                                <View
                                                    key={i + " " + j}
                                                    style={
                                                        setQuizPageStyles.modalOptionContainer
                                                    }
                                                >
                                                    <Text>{weight.name}</Text>
                                                    <TextInput
                                                        keyboardType="numeric"
                                                        style={
                                                            setQuizPageStyles.modalOption
                                                        }
                                                        value={option.weights[
                                                            weight.name
                                                        ].toString()}
                                                        onChangeText={(value) =>
                                                            updateWeights(
                                                                value,
                                                                weight.name,
                                                                i,
                                                            )
                                                        }
                                                    />
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })}
                            {selectedQuestion.options.length < 4 && (
                                <Text
                                    style={setQuizPageStyles.linkButton}
                                    onPress={addOption}
                                >
                                    Add Option
                                </Text>
                            )}
                            <Button
                                title="Confirm"
                                onPress={() => {
                                    setSelectedQuestionIndex(-1);
                                }}
                            />
                            <Button
                                title="Delete Question"
                                style={mainStyles.delete}
                                onPress={deleteQuestion}
                            />
                        </View>
                    </ScrollView>
                )}
            </Modal>
            <Modal
                visible={selectedResultIndex != -1}
                transparent
                onRequestClose={() => setSelectedResultIndex(-1)}
            >
                {selectedResultIndex != -1 && (
                    <ScrollView
                        contentContainerStyle={
                            setQuizPageStyles.modalBackground
                        }
                    >
                        <View style={setQuizPageStyles.modalContainer}>
                            <Text style={setQuizPageStyles.modalHeading}>
                                Editing Result {selectedResultIndex + 1}
                            </Text>
                            <Input
                                label="Result Title"
                                value={selectedResultName}
                                onChangeText={setSelectedResultName}
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Result Description"
                                value={selectedResult.description}
                                onChangeText={(value) =>
                                    setWeights((prev) => {
                                        prev[selectedResultIndex].description =
                                            value;
                                        return [...prev];
                                    })
                                }
                                placeholder=""
                                autoCapitalize
                                multiline
                                inputStyle={setQuizPageStyles.description}
                            />
                            {error && (
                                <Text style={accountStyles.error}>{error}</Text>
                            )}
                            <Button title="Confirm" onPress={saveResult} />
                            <Button
                                title="Delete Result"
                                style={mainStyles.delete}
                                onPress={deleteResult}
                            />
                        </View>
                    </ScrollView>
                )}
            </Modal>
        </View>
    );
}
