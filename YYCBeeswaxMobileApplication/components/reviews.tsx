import { FlashList } from "@shopify/flash-list";
import { DateTime } from "luxon";
import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle, G, Mask, Path, Rect } from "react-native-svg";

import Button from "@/components/button";
import { colors } from "@/consts/styles";
import { useReviewsByProductId } from "@/firebase/hooks/useReviewsByProductId";

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

function ProgressStar({ progress }: { progress: number }) {
    return (
        <View style={{ height: "100%", aspectRatio: 1 }}>
            <Svg viewBox="0 0 47.94 47.94">
                <Mask id="star">
                    <Path
                        fill={colors.yellow}
                        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z"
                    />
                </Mask>
                <G x="0" y="0" mask="url(#star)">
                    <Rect width="100%" height="47.94" fill="lightgray" />
                    <Rect
                        width={progress + "%"}
                        height="47.94"
                        fill={colors.yellow}
                    />
                </G>
            </Svg>
        </View>
    );
}

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
    const { reviews, getMoreReviews, userReview } = useReviewsByProductId(
        props.id,
    );

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
                    {userReview ? (
                        <>
                            <Text style={{ fontSize: 20, paddingBottom: 10 }}>
                                Your Review
                            </Text>
                            <Review review={userReview} />
                            <Button
                                title="Edit Review"
                                style={{ marginVertical: 20 }}
                            />
                        </>
                    ) : (
                        <Button
                            title="Write a Review"
                            style={{ marginBottom: 20 }}
                        />
                    )}
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
                    />
                </>
            ) : (
                <Text>This product has no reviews</Text>
            )}
        </View>
    );
}

// const styles = StyleSheet.create({});
