import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/button";
import LandingCarousel, { Item } from "@/components/landingCarousel";
import { useUser } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";
import { rootPageStyles } from "@/styles/rootPageStyles";

const items: Item[] = [
    {
        text: "Shop for all your favourite YYC Beeswax products",
        iconName: "add-shopping-cart",
    },
    { text: "Take YYC Beeswax related quizzes", iconName: "list-alt" },
    { text: "Discover upcoming events", iconName: "event" },
];

export default function App() {
    const { user, isAdmin } = useUser();

    if (user) {
        if (isAdmin) {
            return <Redirect href="/admin/AdminDashboardPage" />;
        } else if (user.emailVerified) {
            return <Redirect href="/dashboard/HomePage" />;
        } else {
            return <Redirect href="/auth/emailVerification" />;
        }
    }

    return (
        <View style={mainStyles.container}>
            <View style={rootPageStyles.imageContainer}>
                <Image
                    contentFit="contain"
                    source={require("@/assets/YYCBeeswaxFullLogo.png")}
                    style={rootPageStyles.image}
                />
            </View>
            <LandingCarousel items={items} />
            <View style={rootPageStyles.buttonGroup}>
                <Button
                    title="Login"
                    onPress={() => router.push("/auth/login")}
                    style={rootPageStyles.button}
                />
                <Button
                    title="Browse as Guest"
                    onPress={() => router.replace("/dashboard/HomePage")}
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
