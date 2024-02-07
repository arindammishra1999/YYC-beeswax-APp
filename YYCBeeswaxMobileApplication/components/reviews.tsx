import { FlashList } from "@shopify/flash-list";
import { DateTime } from "luxon";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import Button from "@/components/button";
import { colors } from "@/consts/styles";
import { router, useLocalSearchParams } from "expo-router";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import ProgressStar from "@/components/progressStar";
import { useUser } from "@/firebase/providers/userProvider";

type Props = {
    id: string;
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

// function CircularProgress(props) {
//     const { size, strokeWidth, text } = props;
//     const radius = (size - strokeWidth) / 2;
//     const circum = radius * 2 * Math.PI;
//     const svgProgress = 100 - props.progressPercent;
//
//     return (
//         <View style={{margin: 10}}>
//             <Svg width={size} height={size}>
//                 {/* Background Circle */}
//                 <Circle
//                     stroke={props.bgColor ? props.bgColor : "#f2f2f2"}
//                     fill="none"
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     {...{strokeWidth}}
//                 />
//
//                 {/* Progress Circle */}
//                 <Circle
//                     stroke={props.pgColor ? props.pgColor : "#3b5998"}
//                     fill="none"
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     strokeDasharray={`${circum} ${circum}`}
//                     strokeDashoffset={radius * Math.PI * 2 * (svgProgress/100)}
//                     strokeLinecap="round"
//                     transform={`rotate(-90, ${size/2}, ${size/2})`}
//                     {...{strokeWidth}}
//                 />
//
//                 {/* Text */}
//                 <SVGText
//                     fontSize={props.textSize ? props.textSize : "10"}
//                     x={size / 2}
//                     y={size / 2 + (props.textSize ?  (props.textSize / 2) - 1 : 5)}
//                     textAnchor="middle"
//                     fill={props.textColor ? props.textColor : "#333333"}
//                 >
//                     {text}
//                 </SVGText>
//             </Svg>
//         </View>
//     )
// }

function Review({ review }: { review: IReview }) {
    return (
        <View
            style={{
                // backgroundColor: "blue",
                // marginBottom: 30,
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
    const { productId } = useLocalSearchParams();
    const { reviews, getMoreReviews, userReview } = useReviews();
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
                                        `/product/${productId}/SetUserReview`,
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
                                    `/product/${productId}/SetUserReview`,
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
                            <FlashList
                                data={reviews}
                                renderItem={({ item, index }) => {
                                    return <Review review={item} />;
                                }}
                                ItemSeparatorComponent={() => (
                                    <View style={{ height: 20 }} />
                                )}
                                onEndReached={getMoreReviews}
                                estimatedItemSize={91}
                            />
                        </>
                    )}
                </>
            ) : (
                <Text
                    style={{
                        textAlign: "center",
                        paddingTop: 30,
                        fontWeight: "bold",
                        fontSize: 16,
                    }}
                >
                    This product has no reviews
                </Text>
            )}
        </View>
    );
}

// const styles = StyleSheet.create({});
