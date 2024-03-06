import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import i18n from "i18next";
import React from "react";
import { initReactI18next } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/button";
import LandingCarousel from "@/components/landingCarousel";
import { useUser } from "@/firebase/providers/userProvider";
import enTranslation from "@/locales/en.json";
import esTranslation from "@/locales/es.json";
import frTranslation from "@/locales/fr.json";
import { mainStyles } from "@/styles/mainStyles";
import { rootPageStyles } from "@/styles/rootPageStyles";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslation },
        fr: { translation: frTranslation },
        es: { translation: esTranslation },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is missing
    interpolation: {
        escapeValue: false, // React already handles escaping
    },
});

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
