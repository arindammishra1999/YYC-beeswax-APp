import { router } from "expo-router";
import { DateTime } from "luxon";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import Button from "@/components/button";
import ProgressStar from "@/components/progressStar";
import { colors } from "@/consts/styles";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import { useUser } from "@/firebase/providers/userProvider";

type Props = {
    productId: string;
    product: IProduct;
};

function ProgressBar({ progress }: { progress: number }) {
    return (
        <View
            style={{
                width: "100%",
                height: 10,
                backgroundColor: "lightgray",
                borderRadius: 99,
                overflow: "hidden",
            }}
        >
            <View
                style={[
                    {
                        backgroundColor: colors.yellow,
                        height: "100%",
                    },
                    {
                        width: `${progress}%`,
                    },
                ]}
            />
        </View>
    );
}

function Review({ review }: { review: IReview }) {
    return (
        <View
            style={{
                gap: 5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 20,
                }}
            >
                <View
                    style={{
                        height: 20,
                        flexDirection: "row",
                        gap: 4,
                        justifyContent: "flex-start",
                    }}
                >
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
                <Text style={{ fontSize: 16 }}>Username</Text>
                <Text
                    style={{
                        flex: 1,
                        textAlign: "right",
                    }}
                >
                    {DateTime.fromJSDate(
                        review.lastUpdated.toDate(),
                    ).toRelative()}
                </Text>
            </View>
            <Text style={{ fontSize: 20 }}>{review.title}</Text>
            <Text>{review.review || "fdwefqf"}</Text>
        </View>
    );
}

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
                            <Svg
                                height="100%"
                                width="100%"
                                viewBox="0 0 100 100"
                            >
                                <Circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke={colors.yellow}
                                    strokeWidth="5"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                    strokeDasharray={Math.PI * 2 * 45}
                                    strokeDashoffset={
                                        (1 - props.product.reviews.avg / 5) *
                                        (Math.PI * 2 * 45)
                                    }
                                />
                            </Svg>
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
                            <Text style={{ fontSize: 20, paddingBottom: 10 }}>
                                Customer Reviews
                            </Text>
                            {/*<FlashList*/}
                            {/*    data={reviews}*/}
                            {/*    renderItem={({ item, index }) => {*/}
                            {/*        return <Review review={item} />;*/}
                            {/*    }}*/}
                            {/*    ItemSeparatorComponent={() => (*/}
                            {/*        <View style={{ height: 20 }} />*/}
                            {/*    )}*/}
                            {/*    onEndReached={getMoreReviews}*/}
                            {/*    estimatedItemSize={91}*/}
                            {/*/>*/}
                            {reviews.map((review, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={index != 0 && { paddingTop: 20 }}
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
                            // textAlign: "center",
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

// const styles = StyleSheet.create({});
