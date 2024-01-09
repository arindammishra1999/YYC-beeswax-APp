import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import LinkButton from "@/components/linkButton";
import { mainStyles } from "@/styles/mainStyles";
import { rootPageStyles } from "@/styles/rootPageStyles";

import LandingCarousel from "@/components/landingCarousel";

export default function LandingPage() {
    const items = [
        {
            text: "Shop for all your favourite YYC Beeswax products",
            iconName: "add-shopping-cart",
        },
        { text: "Take YYC Beeswax related quizzes", iconName: "list-alt" },
        { text: "Discover upcoming events", iconName: "event" },
    ];

    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.center}>
                <Image
                    resizeMode="contain"
                    source={require("../assets/YYCBeeswaxFullLogo.png")}
                    style={rootPageStyles.image}
                />
            </View>
            <LandingCarousel items={items} />
            <View style={rootPageStyles.buttonGroup}>
                <LinkButton
                    title="Login"
                    href="/auth/login"
                    style={rootPageStyles.button}
                />
                <LinkButton
                    title="Browse as Guest"
                    href="/dashboard/HomePage"
                    style={rootPageStyles.button}
                />
            </View>
            <View style={rootPageStyles.textGroup}>
                <Text style={rootPageStyles.signupText}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                    <Text style={rootPageStyles.signupLinkText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
