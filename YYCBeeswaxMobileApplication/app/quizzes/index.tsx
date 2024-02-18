import React from "react";
import { View } from "react-native";

import Header from "@/components/header";
import { QuizzesScreen } from "@/components/quiz/quizzesScreen";
import { mainStyles } from "@/styles/mainStyles";

export default function Quizzes() {
    return (
        <View style={mainStyles.container}>
            <Header header="Quizzes" />
            <QuizzesScreen />
        </View>
    );
}
