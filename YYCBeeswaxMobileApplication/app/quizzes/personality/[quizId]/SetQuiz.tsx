import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
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
    const quiz = getQuiz<IPersonalityQuiz>(quizId);
    // console.log(quiz);
    const [updatedQuiz, setUpdatedQuiz] = useState<IPersonalityQuiz>(
        quiz ??
            ({
                title: "",
                description: "",
                weights: {
                    "option 1": "description 1",
                    "option 2": "description 2",
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

    const renderQuestion = ({
        item,
        drag,
        isActive,
        getIndex,
    }: RenderItemParams<IPersonalityQuestion>) => {
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

    const renderResult = ({
        item,
        drag,
        isActive,
        getIndex,
    }: RenderItemParams<{ name: string; description: string }>) => {
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
                    <Text style={{ flex: 1 }}>{item.name}</Text>
                    <TouchableOpacity
                        onPress={() => setSelectedResultIndex(getIndex() ?? -1)}
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
            <Header header="Edit" />
            <NestableScrollContainer
                contentContainerStyle={{ gap: 20, padding: 10 }}
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
                {/*<View>*/}
                {/*<Text*/}
                {/*    style={{*/}
                {/*        paddingHorizontal: 10,*/}
                {/*        fontWeight: "bold",*/}
                {/*        fontSize: 16,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Results*/}
                {/*</Text>*/}

                {/*{weights.map((weight, index) => {*/}
                {/*    return (*/}
                {/*        <View key={index} style={{ gap: 10 }}>*/}
                {/*            <Input*/}
                {/*                label={"Result " + index}*/}
                {/*                value={weight.name}*/}
                {/*                onChangeText={(value) =>*/}
                {/*                    setWeights((prev) => {*/}
                {/*                        prev[index].name = value;*/}
                {/*                        return { ...prev };*/}
                {/*                    })*/}
                {/*                }*/}
                {/*                placeholder=""*/}
                {/*                autoCapitalize*/}
                {/*            />*/}
                {/*            <Input*/}
                {/*                label={"Result " + index}*/}
                {/*                value={weight.description}*/}
                {/*                onChangeText={(value) =>*/}
                {/*                    setWeights((prev) => {*/}
                {/*                        prev[index].description = value;*/}
                {/*                        return { ...prev };*/}
                {/*                    })*/}
                {/*                }*/}
                {/*                placeholder=""*/}
                {/*                autoCapitalize*/}
                {/*                multiline*/}
                {/*                inputStyle={{ height: 150 }}*/}
                {/*            />*/}
                {/*        </View>*/}
                {/*    );*/}
                {/*})}*/}

                {/*</View>*/}
                <View>
                    <Text
                        style={{
                            paddingHorizontal: 10,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        Results
                    </Text>
                    <NestableDraggableFlatList
                        // containerStyle={{ height:'50%', paddingVertical: 10 }}
                        data={weights}
                        onDragEnd={({ data }) => setWeights(data)}
                        keyExtractor={(item) => item.name}
                        renderItem={renderResult}
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
                    Add Result
                </Text>
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
                        renderItem={renderQuestion}
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
                    <ScrollView
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(52, 52, 52, 0.8)",
                        }}
                        contentContainerStyle={{
                            justifyContent: "center",
                            alignItems: "center",
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
                            {updatedQuiz.questions[
                                selectedQuestionIndex
                            ].options.map((option, i) => {
                                return (
                                    <View key={i} style={{ gap: 10 }}>
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
                                                    style={{
                                                        flexDirection: "row",
                                                        paddingLeft: 10,
                                                        alignItems: "center",
                                                        gap: 10,
                                                    }}
                                                >
                                                    <Text>{weight.name}</Text>
                                                    <TextInput
                                                        keyboardType="numeric"
                                                        style={{
                                                            paddingHorizontal: 15,
                                                            paddingVertical: 4,
                                                            borderRadius: 8,
                                                            borderWidth: 1,
                                                            borderColor:
                                                                "lightgray",
                                                            fontSize: 14,
                                                        }}
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
                                    style={{
                                        alignSelf: "center",
                                        color: colors.blue,
                                        fontSize: 16,
                                        textDecorationLine: "underline",
                                    }}
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
                                style={{ backgroundColor: "#eb5e68" }}
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
                            />
                        </View>
                    </ScrollView>
                )}
            </Modal>
        </View>
    );
}
