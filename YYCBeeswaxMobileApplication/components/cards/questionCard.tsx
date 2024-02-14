import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";

import { setQuizPageStyles } from "@/styles/setQuizPageStyles";

export default function QuestionCard({
    item,
    drag,
    isActive,
    getIndex,
    onEdit,
}: RenderItemParams<IKnowledgeQuestion | IPersonalityQuestion> & {
    onEdit: (index: number) => void;
}) {
    return (
        <ScaleDecorator activeScale={1.03}>
            <TouchableOpacity
                onLongPress={drag}
                disabled={isActive}
                style={[
                    setQuizPageStyles.questionCard,
                    isActive && setQuizPageStyles.questionCardActive,
                ]}
            >
                <MaterialIcons name="drag-indicator" size={24} />
                <Text style={setQuizPageStyles.questionCardText}>
                    {item.question}
                </Text>
                <TouchableOpacity onPress={() => onEdit(getIndex() ?? -1)}>
                    <Feather
                        name="edit"
                        size={24}
                        style={setQuizPageStyles.questionCardIcon}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </ScaleDecorator>
    );
}
