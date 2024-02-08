import { DateTime } from "luxon";
import React from "react";
import { Text, View } from "react-native";

import ProgressStar from "@/components/progressStar";
import { reviewCardStyles } from "@/styles/components/reviewCardStyles";

export default function Review({ review }: { review: IReview }) {
    return (
        <View style={reviewCardStyles.container}>
            <View style={reviewCardStyles.headingContainer}>
                <View style={reviewCardStyles.ratingsContainer}>
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
                <Text style={reviewCardStyles.username}>Username</Text>
                <Text style={reviewCardStyles.date}>
                    {DateTime.fromJSDate(
                        review.lastUpdated.toDate(),
                    ).toRelative()}
                </Text>
            </View>
            <Text style={reviewCardStyles.title}>{review.title}</Text>
            <Text>{review.review}</Text>
        </View>
    );
}
