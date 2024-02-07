import { DateTime } from "luxon";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ProgressStar from "@/components/progressStar";

export default function Review({ review }: { review: IReview }) {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <View style={styles.ratingsContainer}>
                    {Array(5)
                        .fill(0)
                        .map((value, index) => {
                            return (
                                <ProgressStar
                                    key={index}
                                    progress={100 * (review.rating - index)}
                                />
                            );
                        })}
                </View>
                <Text style={styles.username}>Username</Text>
                <Text style={styles.date}>
                    {DateTime.fromJSDate(
                        review.lastUpdated.toDate(),
                    ).toRelative()}
                </Text>
            </View>
            <Text style={styles.title}>{review.title}</Text>
            <Text>{review.review}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    headingContainer: {
        flexDirection: "row",
        gap: 20,
    },
    ratingsContainer: {
        height: 20,
        flexDirection: "row",
        gap: 4,
        justifyContent: "flex-start",
    },
    username: { fontSize: 16 },
    date: {
        flex: 1,
        textAlign: "right",
    },
    title: { fontSize: 20 },
});
