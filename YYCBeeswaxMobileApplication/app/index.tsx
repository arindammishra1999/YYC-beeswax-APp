import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import Button from "@/app/components/button";
import LandingCarousel from "@/app/components/landingCarousel";
import { useUser } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";
import { rootPageStyles } from "@/styles/rootPageStyles";

export default function App() {
    const { user } = useUser();

    if (user) {
        if (user.emailVerified) {
            return <Redirect href="/pages/dashboard/HomePage" />;
        } else {
            return <Redirect href="/pages/auth/emailVerification" />;
        }
    }

    const items: {
        text: string;
        iconName: keyof typeof MaterialIcons.glyphMap;
    }[] = [
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
                    source={require("@/assets/YYCBeeswaxFullLogo.png")}
                    style={rootPageStyles.image}
                />
            </View>
            <LandingCarousel items={items} />
            <View style={rootPageStyles.buttonGroup}>
                <Button
                    title="Login"
                    onPress={() => router.push("/pages/auth/login")}
                    style={rootPageStyles.button}
                />
                <Button
                    title="Browse as Guest"
                    onPress={() => router.replace("/pages/dashboard/HomePage")}
                    style={rootPageStyles.button}
                />
            </View>
            <View style={rootPageStyles.textGroup}>
                <Text style={rootPageStyles.signupText}>
                    Don't have an account?
                </Text>
                <TouchableOpacity
                    onPress={() => router.push("/pages/auth/signup")}
                >
                    <Text style={rootPageStyles.signupLinkText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
