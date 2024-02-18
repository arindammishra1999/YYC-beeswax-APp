import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TextInput, View } from "react-native";
import {
    NestableDraggableFlatList,
    NestableScrollContainer,
} from "react-native-draggable-flatlist";

import Button from "@/components/button";
import QuestionCard from "@/components/cards/questionCard";
import QuizResultCard from "@/components/cards/quizResultCard";
import Header from "@/components/header";
import Input from "@/components/input";
import { useQuizzesStore } from "@/firebase/store/quizzesStore";
import { mainStyles } from "@/styles/mainStyles";
import { setQuizPageStyles } from "@/styles/setQuizPageStyles";

export default function SetQuiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;
    const { getQuiz, updateQuiz, deleteQuiz, createQuiz } = useQuizzesStore();
    const quiz = getQuiz<IPersonalityQuiz>(quizId);

    const [updatedQuiz, setUpdatedQuiz] = useState<IPersonalityQuiz>(
        quiz ??
            ({
                title: "",
                description: "",
                weights: {
                    "Option 1": "",
                    "Option 2": "",
                },
                questions: [],
                type: "Personality",
            } as unknown as IPersonalityQuiz),
    );
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1);

    const [weights, setWeights] = useState(
        Object.keys(updatedQuiz.weights).map((weight) => {
            return { name: weight, description: updatedQuiz.weights[weight] };
        }),
    );
    const [selectedResultIndex, setSelectedResultIndex] = useState(-1);

    return (
        <View style={mainStyles.container}>
            <Header header={quiz ? "Edit Quiz" : "Create Quiz"} />
            <NestableScrollContainer
                contentContainerStyle={setQuizPageStyles.container}
            >
                <Input
                    label="Title"
                    value={updatedQuiz?.title}
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
                    <Text style={setQuizPageStyles.heading}>Results</Text>
                    {weights.map((weight, i) => {
                        return (
                            <QuizResultCard
                                key={i}
                                item={weight}
                                onEdit={() => setSelectedResultIndex(i)}
                            />
                        );
                    })}
                </View>
                <Text
                    style={[
                        setQuizPageStyles.linkButton,
                        setQuizPageStyles.addButton,
                    ]}
                    onPress={() => {
                        setWeights((prev) => {
                            prev = [
                                ...prev,
                                {
                                    description: "",
                                    name: "Option " + (prev.length + 1),
                                },
                            ];
                            return [...prev];
                        });
                    }}
                >
                    Add Result
                </Text>
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
                        keyExtractor={(item) => item.question}
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
                    onPress={() => {
                        setUpdatedQuiz((prev) => {
                            prev.questions = [
                                ...prev.questions,
                                {
                                    question:
                                        "Question " +
                                        (prev.questions.length + 1),
                                    options: [],
                                },
                            ];
                            return { ...prev };
                        });
                    }}
                >
                    Add Question
                </Text>
                <Button
                    title={quiz ? "Save Changes" : "Create"}
                    onPress={() => {
                        if (quiz) {
                            updateQuiz(quizId, updatedQuiz);
                        } else {
                            createQuiz(updatedQuiz);
                        }
                        router.back();
                    }}
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
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].question
                                }
                                onChangeText={(value) =>
                                    setUpdatedQuiz((prev) => {
                                        prev.questions[
                                            selectedQuestionIndex
                                        ].question = value;
                                        return {
                                            ...prev,
                                            questions: prev.questions,
                                        };
                                    })
                                }
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
                                            label={"Option " + i}
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
                                                            setUpdatedQuiz(
                                                                (prev) => {
                                                                    prev.questions[
                                                                        selectedQuestionIndex
                                                                    ].options[
                                                                        i
                                                                    ].weights[
                                                                        weight.name
                                                                    ] =
                                                                        parseFloat(
                                                                            value,
                                                                        ) ?? 0;
                                                                    return JSON.parse(
                                                                        JSON.stringify(
                                                                            prev,
                                                                        ),
                                                                    );
                                                                },
                                                            )
                                                        }
                                                    />
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            })}
                            {updatedQuiz.questions[selectedQuestionIndex]
                                .options.length < 4 && (
                                <Text
                                    style={setQuizPageStyles.linkButton}
                                    onPress={() => {
                                        setUpdatedQuiz((prev) => {
                                            const temp = {
                                                value: "option",
                                                weights: {} as {
                                                    [key: string]: number;
                                                },
                                            };
                                            weights.forEach((weight) => {
                                                temp.weights[weight.name] = 0;
                                            });
                                            prev.questions[
                                                selectedQuestionIndex
                                            ].options.push(temp);
                                            return { ...prev };
                                        });
                                    }}
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
                                onPress={() => {
                                    setSelectedQuestionIndex(-1);
                                    setUpdatedQuiz((prev) => {
                                        prev.questions = prev.questions.filter(
                                            (_, index) =>
                                                index != selectedQuestionIndex,
                                        );
                                        return { ...prev };
                                    });
                                }}
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
                                value={weights[selectedResultIndex].name}
                                onChangeText={(value) =>
                                    setWeights((prev) => {
                                        prev[selectedResultIndex].name = value;
                                        return { ...prev };
                                    })
                                }
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Result Description"
                                value={weights[selectedResultIndex].description}
                                onChangeText={(value) =>
                                    setWeights((prev) => {
                                        prev[selectedResultIndex].description =
                                            value;
                                        return { ...prev };
                                    })
                                }
                                placeholder=""
                                autoCapitalize
                                multiline
                                inputStyle={setQuizPageStyles.description}
                            />
                            <Button
                                title="Confirm"
                                onPress={() => {
                                    setSelectedResultIndex(-1);
                                }}
                            />
                            <Button
                                title="Delete Question"
                                style={mainStyles.delete}
                                onPress={() => {
                                    setSelectedResultIndex(-1);
                                    setWeights((prev) => {
                                        prev = prev.filter(
                                            (_, index) =>
                                                index != selectedResultIndex,
                                        );
                                        return [...prev];
                                    });
                                }}
                            />
                        </View>
                    </ScrollView>
                )}
            </Modal>
        </View>
    );
}
