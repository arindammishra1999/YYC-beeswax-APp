import Header from "@/components/header";
import React, { useState } from "react";
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import Input from "@/components/input";
import ProgressStar from "@/components/progressStar";
import Button from "@/components/button";
import { accountStyles } from "@/styles/accountStyles";
import { router } from "expo-router";

export default function Review() {
    const { userReview, updateUserReview } = useReviews();
    const [review, setReview] = useState<{
        title: string;
        review: string;
        rating: number;
    }>({
        title: userReview?.title ?? "",
        review: userReview?.review ?? "",
        rating: userReview?.rating ?? -1,
    });
    const [error, setError] = useState("");

    function submit() {
        setError("");
        if (review.rating == -1) {
            setError("Please enter a rating.");
            return;
        }
        if (review.title == "") {
            setError("Please enter a title.");
            return;
        }
        if (review.review == "") {
            setError("Please enter a review.");
            return;
        }

        updateUserReview(review);
        router.back();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header
                    header={userReview ? "Update Review" : "Write a Review"}
                />
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ gap: 30, paddingVertical: 20, flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                paddingBottom: 8,
                                paddingHorizontal: 10,
                            }}
                        >
                            Overall Rating
                        </Text>
                        <View
                            style={{
                                height: 40,
                                flexDirection: "row",
                                gap: 16,
                                justifyContent: "center",
                            }}
                        >
                            {Array(5)
                                .fill(0)
                                .map((value, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setReview((prev) => ({
                                                    ...prev,
                                                    rating: index + 1,
                                                }));
                                            }}
                                        >
                                            <ProgressStar
                                                key={index}
                                                progress={
                                                    100 *
                                                    (review.rating - index)
                                                }
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                        </View>
                        <Input
                            label={"Title"}
                            placeholder={""}
                            autoCapitalize={true}
                            value={review.title}
                            onChangeText={(value) =>
                                setReview((prev) => ({
                                    ...review,
                                    title: value,
                                }))
                            }
                        />
                        <Input
                            label={"Review"}
                            placeholder={""}
                            autoCapitalize={true}
                            inputStyle={{ height: 200 }}
                            multiline={true}
                            value={review.review}
                            onChangeText={(value) =>
                                setReview((prev) => ({
                                    ...review,
                                    review: value,
                                }))
                            }
                        />
                        {error && (
                            <Text style={accountStyles.error}>{error}</Text>
                        )}
                    </View>
                </ScrollView>
                <Button title={"Submit Review"} onPress={submit} />
            </View>
        </TouchableWithoutFeedback>
    );
}
