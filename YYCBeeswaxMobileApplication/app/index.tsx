import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/button";
import LandingCarousel from "@/components/landingCarousel";
import { useUser } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";
import { rootPageStyles } from "@/styles/rootPageStyles";
import AdminDashboardPage from "./admin/adminDashboardPage";

export default function App() {
    const { user } = useUser();

    if (user) {
        if (user.emailVerified) {
            return <Redirect href="/dashboard/HomePage" />;
        } else {
            return <Redirect href="/auth/emailVerification" />;
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

    return <AdminDashboardPage />;
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
