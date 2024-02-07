import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/button";
import Review from "@/components/cards/reviewCard";
import ProgressBar from "@/components/progressBar";
import ProgressCircle from "@/components/progressCircle";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import { useUser } from "@/firebase/providers/userProvider";

type Props = {
    productId: string;
    product: IProduct;
};

export default function Reviews(props: Props) {
    const { reviews, userReview } = useReviews();
    const { user } = useUser();
    return (
        <View>
            {props.product.reviews && (
                <View style={styles.statsContainer}>
                    <View style={styles.barsContainer}>
                        {(["5", "4", "3", "2", "1"] as const).map((value) => {
                            if (!props.product.reviews) {
                                return;
                            }
                            return (
                                <View key={value} style={styles.barContainer}>
                                    <Text>{value}</Text>
                                    <ProgressBar
                                        progress={
                                            (100 *
                                                (props.product.reviews[value] ??
                                                    0)) /
                                            props.product.reviews.count
                                        }
                                    />
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.circleContainer}>
                        <Text style={styles.avgText}>
                            {props.product.reviews.avg.toPrecision(2)}
                        </Text>
                        <Text style={styles.countText}>
                            {props.product.reviews.count} reviews
                        </Text>
                        <ProgressCircle
                            progress={1 - props.product.reviews.avg / 5}
                        />
                    </View>
                </View>
            )}
            {user && userReview && (
                <>
                    <Text style={styles.userReviewHeading}>Your Review</Text>
                    <Review review={userReview} />
                    <Button
                        title="Edit Review"
                        onPress={() =>
                            router.push(
                                `/product/${props.productId}/SetUserReview`,
                            )
                        }
                        style={styles.button}
                    />
                </>
            )}
            {!props.product.reviews && (
                <Text style={styles.noReviewText}>
                    This product has no reviews
                </Text>
            )}
            {user && !userReview && (
                <Button
                    title="Write a Review"
                    onPress={() =>
                        router.push(`/product/${props.productId}/SetUserReview`)
                    }
                    style={styles.button}
                />
            )}
            {reviews.length > 0 && (
                <>
                    <Text style={styles.customerReviewHeading}>
                        Customer Reviews
                    </Text>
                    {reviews.map((review, index) => {
                        return (
                            <View key={index} style={styles.reviewContainer}>
                                <Review review={review} />
                            </View>
                        );
                    })}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-around",
        paddingTop: 20,
        paddingBottom: 20,
    },
    barsContainer: {
        width: "50%",
        justifyContent: "space-between",
    },
    barContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    circleContainer: {
        width: "35%",
        aspectRatio: 1,
    },
    avgText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        top: "20%",
        fontSize: 40,
        fontWeight: "bold",
    },
    countText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        top: "60%",
        fontSize: 12,
    },
    userReviewHeading: { fontSize: 20, paddingBottom: 10, fontWeight: "bold" },
    button: { marginVertical: 20 },
    noReviewText: {
        paddingTop: 20,
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 16,
    },
    customerReviewHeading: { fontSize: 20, fontWeight: "bold" },
    reviewContainer: { paddingTop: 20 },
});
