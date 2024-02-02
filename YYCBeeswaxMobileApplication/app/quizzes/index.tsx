import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/header";
import Skeleton from "@/components/skeleton";
import { getQuizzes } from "@/firebase/getCollections/getQuizzes";
import { mainStyles } from "@/styles/mainStyles";
import { quizzesPageStyles } from "@/styles/quizzesPageStyles";

const TMP_IMG =
    "https://firebasestorage.googleapis.com/v0/b/yyc-mobile.appspot.com/o/ProductImages%2FYYC-Beeswax-041-min-324x324.jpg?alt=media&token=291aef00-df21-44df-9879-39e780f2bac7";

function LoadingQuizCard() {
    return (
        <View style={quizzesPageStyles.card}>
            <View style={quizzesPageStyles.imageContainer}>
                <Skeleton style={quizzesPageStyles.image} />
            </View>
            <View style={quizzesPageStyles.textContainer}>
                <View style={{ gap: 10 }}>
                    <Skeleton style={{ height: 24 }} />
                    <Skeleton style={{ height: 16, width: "80%" }} />
                </View>
                <View style={quizzesPageStyles.detailsContainer}>
                    <Skeleton style={{ height: 20, width: "40%" }} />
                    <Skeleton style={{ height: 20, width: "30%" }} />
                </View>
            </View>
        </View>
    );
}

function QuizCard({ quiz }: { quiz: IQuiz }) {
    return (
        <TouchableOpacity
            style={quizzesPageStyles.card}
            onPress={() =>
                router.push(
                    `/quizzes/${quiz.type.toLowerCase()}/${
                        quiz.id
                    }` as Href<any>,
                )
            }
        >
            <View style={quizzesPageStyles.imageContainer}>
                <Image
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await getQuizzes();
            setQuizzes(data);
            setLoading(false);
        })();
    }, []);

    return (
        <View style={mainStyles.container}>
            <Header header="Quizzes" />
            {loading ? (
                <View style={quizzesPageStyles.container}>
                    <LoadingQuizCard />
                    <View style={quizzesPageStyles.cardSpacing} />
                    <LoadingQuizCard />
                    <View style={quizzesPageStyles.cardSpacing} />
                    <LoadingQuizCard />
                    <View style={quizzesPageStyles.cardSpacing} />
                    <LoadingQuizCard />
                    <View style={quizzesPageStyles.cardSpacing} />
                    <LoadingQuizCard />
                    <View style={quizzesPageStyles.cardSpacing} />
                    <LoadingQuizCard />
                </View>
            ) : (
                <FlashList
                    contentContainerStyle={quizzesPageStyles.container}
                    renderItem={({ item }) => <QuizCard quiz={item} />}
                    ItemSeparatorComponent={() => (
                        <View style={quizzesPageStyles.cardSpacing} />
                    )}
                    data={quizzes}
                    estimatedItemSize={100}
                />
            )}
        </View>
    );
}
