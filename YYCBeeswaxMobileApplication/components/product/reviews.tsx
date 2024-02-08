import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import Button from "@/components/button";
import Review from "@/components/cards/reviewCard";
import ProgressBar from "@/components/progressBar";
import ProgressCircle from "@/components/progressCircle";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import { useUser } from "@/firebase/providers/userProvider";
import { reviewsStyles } from "@/styles/components/reviewsStyles";

type Props = {
    productId: string;
    product: IProduct;
};

export default function Reviews(props: Props) {
    const { reviews, userReview } = useReviews();
    const { user } = useUser();
    return (
        <View>
            {props.product.reviews && props.product.reviews.count > 0 && (
                <View style={reviewsStyles.statsContainer}>
                    <View style={reviewsStyles.barsContainer}>
                        {(["5", "4", "3", "2", "1"] as const).map((value) => {
                            if (!props.product.reviews) {
                                return;
                            }
                            return (
                                <View
                                    key={value}
                                    style={reviewsStyles.barContainer}
                                >
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
                    <View style={reviewsStyles.circleContainer}>
                        <Text style={reviewsStyles.avgText}>
                            {props.product.reviews.avg.toPrecision(2)}
                        </Text>
                        <Text style={reviewsStyles.countText}>
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
                    <Text style={reviewsStyles.userReviewHeading}>
                        Your Review
                    </Text>
                    <Review review={userReview} />
                    <Button
                        title="Edit Review"
                        onPress={() =>
                            router.push(
                                `/product/${props.productId}/SetUserReview`,
                            )
                        }
                        style={reviewsStyles.button}
                    />
                </>
            )}
            {(!props.product.reviews || props.product.reviews.count == 0) && (
                <Text style={reviewsStyles.noReviewText}>
                    This product has no reviews
                </Text>
            )}
            {user && !userReview && (
                <Button
                    title="Write a Review"
                    onPress={() =>
                        router.push(`/product/${props.productId}/SetUserReview`)
                    }
                    style={reviewsStyles.button}
                />
            )}
            {reviews.length > 0 && (
                <>
                    <Text style={reviewsStyles.customerReviewHeading}>
                        Customer Reviews
                    </Text>
                    {reviews.map((review, index) => {
                        return (
                            <View
                                key={index}
                                style={reviewsStyles.reviewContainer}
                            >
                                <Review review={review} />
                            </View>
                        );
                    })}
                </>
            )}
        </View>
    );
}
