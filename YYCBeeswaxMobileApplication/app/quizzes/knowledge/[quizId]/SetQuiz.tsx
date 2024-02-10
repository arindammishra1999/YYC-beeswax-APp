import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Href, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";

import Header from "@/components/header";
import Input from "@/components/input";
import { useQuizzes } from "@/firebase/providers/quizzesProvider";
import { mainStyles } from "@/styles/mainStyles";

export default function SetQuiz() {
    const { quizId } = useLocalSearchParams() as Record<string, string>;
    const { getQuizById } = useQuizzes();
    const quiz = getQuizById<IKnowledgeQuiz>(quizId);
    // console.log(quiz);
    const [updatedQuiz, setUpdatedQuiz] = useState(quiz as IKnowledgeQuiz);

    const renderItem = ({
        item,
        drag,
        isActive,
    }: RenderItemParams<IKnowledgeQuestion>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        {
                            padding: 10,
                            elevation: 8,
                            marginHorizontal: 10,
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
                    <TouchableOpacity>
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
                    setUpdatedQuiz((prev) => ({ ...prev, description: value }))
                }
                placeholder=""
                autoCapitalize
            />
            <DraggableFlatList
                data={updatedQuiz.questions}
                onDragEnd={({ data }) =>
                    setUpdatedQuiz((prev) => ({ ...prev, questions: data }))
                }
                keyExtractor={(item) => item.question}
                // renderItem={({ item }) => {
                //     return (
                //         <ScaleDecorator>
                //             <View
                //                 style={{
                //                     elevation: 10,
                //                     padding: 10,
                //                     backgroundColor: "white",
                //                 }}
                //             >
                //                 <MaterialIcons
                //                     name="drag-indicator"
                //                     size={24}
                //                     color="black"
                //                 />
                //                 <Text>{item.question}</Text>
                //             </View>
                //         </ScaleDecorator>
                //     );
                // }}
                renderItem={renderItem}
            />
        </View>
    );
}
