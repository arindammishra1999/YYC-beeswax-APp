import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import {
    NestableDraggableFlatList,
    NestableScrollContainer,
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";

import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import { colors } from "@/consts/styles";
import { useQuizzes } from "@/firebase/providers/quizzesProvider";
import { mainStyles } from "@/styles/mainStyles";

export default function SetQuiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;
    const { getQuiz } = useQuizzes();
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

    const renderItem = ({
        item,
        drag,
        isActive,
        getIndex,
    }: RenderItemParams<IKnowledgeQuestion>) => {
        return (
            <ScaleDecorator activeScale={1.03}>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        {
                            padding: 10,
                            elevation: 4,
                            margin: 10,
                            marginBottom: 10,
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        },
                        { backgroundColor: isActive ? "lightgray" : "white" },
                    ]}
                >
                    <MaterialIcons name="drag-indicator" size={24} />
                    <Text style={{ flex: 1 }}>{item.question}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            setSelectedQuestionIndex(getIndex() ?? -1)
                        }
                    >
                        <Feather
                            name="edit"
                            size={24}
                            style={{
                                // backgroundColor: "blue",
                                padding: 10,
                                // borderRadius: 15,
                                transform: [
                                    { translateX: 10 },
                                    // { translateY: -10 },
                                ],
                            }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    return (
        <View style={mainStyles.container}>
            <Header header={quiz ? "Edit Quiz" : "Create Quiz"} />
            <NestableScrollContainer
                contentContainerStyle={{ gap: 10, padding: 10 }}
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
                    inputStyle={{ height: 150 }}
                />
                <View>
                    <Text
                        style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        Questions
                    </Text>
                    <NestableDraggableFlatList
                        // containerStyle={{ height:'50%', paddingVertical: 10 }}
                        data={updatedQuiz.questions}
                        onDragEnd={({ data }) =>
                            setUpdatedQuiz((prev) => ({
                                ...prev,
                                questions: data,
                            }))
                        }
                        keyExtractor={(item) => item.question}
                        renderItem={renderItem}
                    />
                </View>
                <Text
                    style={{
                        alignSelf: "center",
                        color: colors.blue,
                        fontSize: 16,
                        textDecorationLine: "underline",
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                    onPress={() => {
                        setUpdatedQuiz((prev) => {
                            prev.questions = [
                                ...prev.questions,
                                {
                                    id: "",
                                    answers: [],
                                    difficulty: "",
                                    question:
                                        "Question " +
                                        (prev.questions.length + 1),
                                    correctAnswer: "True",
                                    incorrectAnswer1: "False",
                                    incorrectAnswer2: "False",
                                    incorrectAnswer3: "False",
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
                        setSelectedQuestionIndex(-1);
                    }}
                />
                {quiz && (
                    <Button
                        title="Delete Quiz"
                        style={{ backgroundColor: "#eb5e68" }}
                    />
                )}
            </NestableScrollContainer>
            <Modal
                visible={selectedQuestionIndex != -1}
                transparent
                onRequestClose={() => setSelectedQuestionIndex(-1)}
            >
                {selectedQuestionIndex != -1 && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(52, 52, 52, 0.8)",
                        }}
                    >
                        <View
                            style={{
                                elevation: 8,
                                backgroundColor: "white",
                                margin: 10,
                                padding: 10,
                                borderRadius: 30,
                                gap: 20,
                                width: "95%",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 24,
                                    paddingTop: 10,
                                }}
                            >
                                Editing Question {selectedQuestionIndex + 1}
                            </Text>
                            {/*<View style={{ paddingHorizontal: 10, gap: 10 }}>*/}
                            {/*    <Text*/}
                            {/*        style={{ fontWeight: "bold", fontSize: 16 }}*/}
                            {/*    >*/}
                            {/*        Question:*/}
                            {/*    </Text>*/}
                            {/*    <Text>*/}
                            {/*        {*/}
                            {/*            updatedQuiz?.questions[*/}
                            {/*                selectedQuestionIndex*/}
                            {/*            ].question*/}
                            {/*        }*/}
                            {/*    </Text>*/}
                            {/*</View>*/}
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
                            <Input
                                label="Correct Answer"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].correctAnswer
                                }
                                onChangeText={(value) =>
                                    setUpdatedQuiz((prev) => {
                                        prev.questions[
                                            selectedQuestionIndex
                                        ].correctAnswer = value;
                                        return {
                                            ...prev,
                                            questions: prev.questions,
                                        };
                                    })
                                }
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Option 1"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].incorrectAnswer1
                                }
                                onChangeText={(value) =>
                                    setUpdatedQuiz((prev) => {
                                        prev.questions[
                                            selectedQuestionIndex
                                        ].incorrectAnswer1 = value;
                                        return {
                                            ...prev,
                                            questions: prev.questions,
                                        };
                                    })
                                }
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Option 2"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].incorrectAnswer2
                                }
                                onChangeText={(value) =>
                                    setUpdatedQuiz((prev) => {
                                        prev.questions[
                                            selectedQuestionIndex
                                        ].incorrectAnswer2 = value;
                                        return {
                                            ...prev,
                                            questions: prev.questions,
                                        };
                                    })
                                }
                                placeholder=""
                                autoCapitalize
                            />
                            <Input
                                label="Option 3"
                                value={
                                    updatedQuiz?.questions[
                                        selectedQuestionIndex
                                    ].incorrectAnswer3
                                }
                                onChangeText={(value) =>
                                    setUpdatedQuiz((prev) => {
                                        prev.questions[
                                            selectedQuestionIndex
                                        ].incorrectAnswer3 = value;
                                        return {
                                            ...prev,
                                            questions: prev.questions,
                                        };
                                    })
                                }
                                placeholder=""
                                autoCapitalize
                            />
                            <Text
                                style={{
                                    alignSelf: "center",
                                    color: colors.blue,
                                    fontSize: 16,
                                    textDecorationLine: "underline",
                                }}
                                onPress={() => {
                                    // const index = selectedQuestionIndex;
                                    setSelectedQuestionIndex(-1);
                                    setUpdatedQuiz((prev) => {
                                        prev.questions = prev.questions.filter(
                                            (_, index) =>
                                                index != selectedQuestionIndex,
                                        );
                                        return { ...prev };
                                    });
                                }}
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
