import { router } from "expo-router";
import { collection, getCountFromServer, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/header";
import { db } from "@/firebase/config";
import { mainStyles } from "@/styles/mainStyles";
import { quizzesPageStyles } from "@/styles/quizzesPageStyles";

interface IQuiz {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    count: number;
}

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
            for (const quiz of data) {
                const count = await getCountFromServer(
                    collection(db, "quizzes", quiz.id, "questions"),
                );
                quiz.count = count.data().count;
            }
            setQuizzes(data);
        })();
    }, []);

    return (
        <View style={mainStyles.container}>
            <Header header="Quizzes" />
            <View style={quizzesPageStyles.container}>
                {quizzes.map((quiz) => (
                    <TouchableOpacity
                        key={quiz.id}
                        style={quizzesPageStyles.card}
                        onPress={() =>
                            router.push(`/dashboard/quizzes/${quiz.id}`)
                        }
                    >
                        <View style={quizzesPageStyles.imageContainer}>
                            <Image
                                resizeMode="contain"
                                source={{
                                    uri: "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7",
                                }}
                                style={quizzesPageStyles.image}
                            />
                            <Text style={quizzesPageStyles.imageText}>
                                {quiz.count} questions
                            </Text>
                        </View>
                        <View style={quizzesPageStyles.textContainer}>
                            <Text style={quizzesPageStyles.title}>
                                {quiz.title}
                            </Text>
                            <View style={quizzesPageStyles.detailsContainer}>
                                <Text>2 Days ago</Text>
                                <Text style={quizzesPageStyles.countContainer}>
                                    24 Plays
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
