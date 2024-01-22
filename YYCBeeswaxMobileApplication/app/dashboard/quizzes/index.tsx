import { Href, router } from "expo-router";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/header";
import { getQuizzes } from "@/firebase/getCollections/getQuizzes";
import { mainStyles } from "@/styles/mainStyles";
import { quizzesPageStyles } from "@/styles/quizzesPageStyles";

const TMP_IMG =
    "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7";

function QuizCard({ quiz }: { quiz: IQuiz }) {
    return (
        <TouchableOpacity
            style={quizzesPageStyles.card}
            onPress={() =>
                router.push(
                    `/dashboard/quizzes/${quiz.type.toLowerCase()}/${
                        quiz.id
                    }` as Href<unknown>,
                )
            }
        >
            <View style={quizzesPageStyles.imageContainer}>
                <Image
                    resizeMode="contain"
                    source={{
                        uri: TMP_IMG,
                    }}
                    style={quizzesPageStyles.image}
                />
                <Text style={quizzesPageStyles.imageText}>
                    {quiz.count} questions
                </Text>
            </View>
            <View style={quizzesPageStyles.textContainer}>
                <View>
                    <Text style={quizzesPageStyles.title}>{quiz.title}</Text>
                    <Text>{quiz.type} Quiz</Text>
                </View>
                <View style={quizzesPageStyles.detailsContainer}>
                    <Text>
                        {DateTime.fromJSDate(
                            quiz.created.toDate(),
                        ).toRelative()}
                    </Text>
                    <Text style={quizzesPageStyles.countContainer}>
                        {quiz.plays} Plays
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getQuizzes();
            setQuizzes(data);
        })();
    }, []);

    return (
        <View style={mainStyles.container}>
            <Header header="Quizzes" />
            <FlatList
                contentContainerStyle={quizzesPageStyles.container}
                data={quizzes}
                renderItem={({ item }) => <QuizCard quiz={item} />}
            />
        </View>
    );
}
