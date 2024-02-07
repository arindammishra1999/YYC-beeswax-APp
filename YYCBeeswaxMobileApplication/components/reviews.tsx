import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

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
            {props.product.reviews ? (
                <>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 20,
                            justifyContent: "space-around",
                            paddingTop: 20,
                            paddingBottom: 30,
                        }}
                    >
                        <View
                            style={{
                                width: "50%",
                                justifyContent: "space-between",
                            }}
                        >
                            {(["5", "4", "3", "2", "1"] as const).map(
                                (value) => {
                                    if (!props.product.reviews) {
                                        return;
                                    }
                                    return (
                                        <View
                                            key={value}
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 10,
                                            }}
                                        >
                                            <Text>{value}</Text>
                                            <ProgressBar
                                                progress={
                                                    (100 *
                                                        (props.product.reviews[
                                                            value
                                                        ] ?? 0)) /
                                                    props.product.reviews.count
                                                }
                                            />
                                        </View>
                                    );
                                },
                            )}
                        </View>
                        <View
                            style={{
                                width: "35%",
                                aspectRatio: 1,
                            }}
                        >
                            <Text
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    textAlign: "center",
                                    top: "20%",
                                    fontSize: 40,
                                    fontWeight: "bold",
                                }}
                            >
                                {props.product.reviews.avg.toPrecision(2)}
                            </Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    textAlign: "center",
                                    top: "60%",
                                    fontSize: 12,
                                }}
                            >
                                {props.product.reviews.count} reviews
                            </Text>
                            <ProgressCircle
                                progress={1 - props.product.reviews.avg / 5}
                            />
                        </View>
                    </View>
                    {user && userReview && (
                        <>
                            <Text style={{ fontSize: 20, paddingBottom: 10 }}>
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
                                style={{ marginVertical: 20 }}
                            />
                        </>
                    )}
                    {user && !userReview && (
                        <Button
                            title="Write a Review"
                            onPress={() =>
                                router.push(
                                    `/product/${props.productId}/SetUserReview`,
                                )
                            }
                            style={{ marginBottom: 20 }}
                        />
                    )}
                    {reviews.length > 0 && (
                        <>
                            <Text style={{ fontSize: 20 }}>
                                Customer Reviews
                            </Text>
                            {reviews.map((review, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{ paddingTop: 20 }}
                                    >
                                        <Review review={review} />
                                    </View>
                                );
                            })}
                        </>
                    )}
                </>
            ) : (
                <>
                    <Text
                        style={{
                            paddingVertical: 20,
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        This product has no reviews
                    </Text>
                    {user && !userReview && (
                        <Button
                            title="Write a Review"
                            onPress={() =>
                                router.push(
                                    `/product/${props.productId}/SetUserReview`,
                                )
                            }
                            style={{ marginBottom: 20 }}
                        />
                    )}
                </>
            )}
        </View>
    );
}
