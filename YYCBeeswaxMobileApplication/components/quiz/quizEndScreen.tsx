import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import { mainStyles } from "@/styles/mainStyles";
import { quizPageStyles } from "@/styles/quizPageStyles";

type Props = {
    title: string;
    description: string;
    imageURI: string;
    onEnd: () => void;
};

export function QuizEndScreen({ title, description, imageURI, onEnd }: Props) {
    return (
        <View style={mainStyles.container}>
            <Header header="Quiz Results" />
            <Image
                contentFit="contain"
                source={{
                    uri: imageURI,
                }}
                style={quizPageStyles.image}
            />
            <View style={quizPageStyles.container}>
                <Text style={quizPageStyles.title}>{title}</Text>
                <Text style={quizPageStyles.bodyText}>{description}</Text>
                <View style={quizPageStyles.nextButton}>
                    <Button title="Back to Quizzes" onPress={onEnd} />
                </View>
            </View>
        </View>
    );
}
