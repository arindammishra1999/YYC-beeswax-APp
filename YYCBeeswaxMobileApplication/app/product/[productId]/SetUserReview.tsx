import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Keyboard,
    ScrollView,
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
import { setUserReviewPageStyles } from "@/styles/setUserReviewPageStyles";

export default function SetUserReview() {
    const { t } = useTranslation();
    const { userReview, updateUserReview, deleteUserReview } = useReviews();
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

    function handleDeleteReview() {
        forceRemove && forceRemove();
        deleteUserReview();
        router.back();
    }

    const forceRemove = useUnsavedChangesCheck(sameReview);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header
                    header={
                        userReview ? t("Update Review") : t("Write a Review")
                    }
                />
                <ScrollView style={accountStyles.formContainer}>
                    <View style={accountStyles.form}>
                        <Text style={setUserReviewPageStyles.text}>
                            {t("Overall Rating")}
                        </Text>
                        <View style={setUserReviewPageStyles.ratingsContainer}>
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
                            label={t("Title")}
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
                            label={t("Review")}
                            placeholder=""
                            autoCapitalize
                            inputStyle={setUserReviewPageStyles.textArea}
                            multiline
                            value={review.review}
                            onChangeText={(value) => {
                                setReview((prev) => ({
                                    ...prev,
                                    review: value,
                                }));
                            }}
                        />
                        {userReview && (
                            <Text
                                style={setUserReviewPageStyles.delete}
                                onPress={handleDeleteReview}
                            >
                                {t("Delete Review")}
                            </Text>
                        )}
                        {error && (
                            <Text style={accountStyles.error}>{error}</Text>
                        )}
                    </View>
                </ScrollView>
                <Button title={t("Submit Review")} onPress={submit} />
            </View>
        </TouchableWithoutFeedback>
    );
}
