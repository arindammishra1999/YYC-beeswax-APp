import { Href, router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/header";
import { db } from "@/firebase/config";
import { mainStyles } from "@/styles/mainStyles";
import { quizzesPageStyles } from "@/styles/quizzesPageStyles";

const TMP_IMG =
    "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    useEffect(() => {
        (async () => {
            const query = await getDocs(collection(db, "quizzes"));
            const data = query.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                } as IQuiz;
            });
            setQuizzes(data);
        })();
    }, []);

    return (
        <ScrollView style={mainStyles.container}>
            <Header header="Quizzes" />
            <View style={quizzesPageStyles.container}>
                {quizzes.map((quiz) => (
                    <TouchableOpacity
                        key={quiz.id}
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
                                <Text style={quizzesPageStyles.title}>
                                    {quiz.title}
                                </Text>
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
                ))}
            </View>
        </ScrollView>
    );
}
