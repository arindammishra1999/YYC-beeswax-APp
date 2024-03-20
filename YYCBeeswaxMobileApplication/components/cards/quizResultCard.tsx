import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { setQuizPageStyles } from "@/styles/setQuizPageStyles";

export default function QuizResultCard({
    item,
    onEdit,
}: {
    item: { name: string; description: string };
    onEdit: () => void;
}) {
    return (
        <View style={setQuizPageStyles.questionCard}>
            <Text style={setQuizPageStyles.resultCardText}>{item.name}</Text>
            <TouchableOpacity onPress={onEdit}>
                <Feather
                    name="edit"
                    size={24}
                    style={setQuizPageStyles.questionCardIcon}
                />
            </TouchableOpacity>
        </View>
    );
}
