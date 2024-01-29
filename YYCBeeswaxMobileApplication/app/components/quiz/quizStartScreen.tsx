import React from "react";
import { Image, Text, View } from "react-native";

import Button from "@/app/components/button";
import Header from "@/app/components/header";
import { mainStyles } from "@/styles/mainStyles";
import { quizPageStyles } from "@/styles/quizPageStyles";

type Props = {
    quiz: IQuiz | null;
    onStart: () => void;
    imageURI: string;
};

export function QuizStartScreen({ quiz, onStart, imageURI }: Props) {
    return (
        <View style={mainStyles.container}>
            <Header header="Quiz" />
            <Image
                resizeMode="contain"
                source={{
                    uri: imageURI,
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
                <View style={quizPageStyles.nextButton}>
                    <Button title="Start Quiz" onPress={onStart} />
                </View>
            </View>
        </View>
    );
}
