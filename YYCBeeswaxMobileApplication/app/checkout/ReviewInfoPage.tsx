import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";

import { reviewInfoPageStyles } from "@/styles/reviewInfoPageStyles";

export default function ReviewInfoPage() {
    const { t } = useTranslation();
    return (
        <View style={reviewInfoPageStyles.container}>
            <Text style={reviewInfoPageStyles.messageText}>
                {t(
                    "Payment successful. Your order will be delivered soon! Thank you for shopping with YYC Beeswax.",
                )}
            </Text>
            <Image
                contentFit="contain"
                source={require("@/assets/CheckmarkSuccess.gif")}
                style={reviewInfoPageStyles.gif}
            />
            <TouchableOpacity
                style={reviewInfoPageStyles.button}
                onPress={() => router.push("/dashboard/HomePage")}
            >
                <Text style={reviewInfoPageStyles.buttonText}>
                    {t("Return Home")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
