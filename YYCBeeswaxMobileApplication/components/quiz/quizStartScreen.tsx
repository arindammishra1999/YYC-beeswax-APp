import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
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
                contentFit="contain"
                source={{
                    uri: imageURI,
                }}
                style={quizPageStyles.image}
            />
            <View style={quizPageStyles.container}>
                <Text style={quizPageStyles.title}>{quiz?.title}</Text>
                <View style={quizPageStyles.details}>
                    <View style={quizPageStyles.stats}>
                        <Text style={quizPageStyles.bodyText}>Played</Text>
                        <Text style={quizPageStyles.bodyText}>
                            {quiz?.plays}
                        </Text>
                    </View>
                    <View style={quizPageStyles.stats}>
                        <Text style={quizPageStyles.bodyText}>Questions</Text>
                        <Text style={quizPageStyles.bodyText}>
                            {quiz?.count}
                        </Text>
                    </View>
                </View>
                <Text style={quizPageStyles.bodyText}>{quiz?.description}</Text>
                <View style={quizPageStyles.nextButton}>
                    <Button title="Start Quiz" onPress={onStart} />
                </View>
            </View>
        </View>
    );
}
