import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import ProgressStar from "@/components/progressStar";
import { useReviews } from "@/firebase/providers/reviewsProvider";
import { useUnsavedChangesCheck } from "@/lib/hooks/useUnsavedChangesCheck";
import { accountStyles } from "@/styles/accountStyles";

export default function SetUserReview() {
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
    const [sameReview, setSameReview] = useState(!!userReview);

    useEffect(() => {
        setSameReview(
            review.title == userReview?.title &&
                review.review == userReview.review &&
                review.rating == userReview.rating,
        );
    }, [review]);

    function submit() {
        if (sameReview) {
            router.back();
            return;
        }

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

        forceRemove && forceRemove();
        updateUserReview(review);
        router.back();
    }

    const forceRemove = useUnsavedChangesCheck(sameReview);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header
                    header={userReview ? "Update Review" : "Write a Review"}
                />
                <ScrollView style={accountStyles.formContainer}>
                    <View style={accountStyles.form}>
                        <Text style={styles.text}>Overall Rating</Text>
                        <View style={styles.ratingsContainer}>
                            {Array(5)
                                .fill(0)
                                .map((value, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
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
                            label="Title"
                            placeholder=""
                            autoCapitalize
                            value={review.title}
                            onChangeText={(value) => {
                                setReview((prev) => ({
                                    ...prev,
                                    title: value,
                                }));
                            }}
                        />
                        <Input
                            label="Review"
                            placeholder=""
                            autoCapitalize
                            inputStyle={styles.textArea}
                            multiline
                            value={review.review}
                            onChangeText={(value) => {
                                setReview((prev) => ({
                                    ...prev,
                                    review: value,
                                }));
                            }}
                        />
                        {error && (
                            <Text style={accountStyles.error}>{error}</Text>
                        )}
                    </View>
                </ScrollView>
                <Button title="Submit Review" onPress={submit} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    ratingsContainer: {
        height: 40,
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
    },
    textArea: { height: 200 },
});
