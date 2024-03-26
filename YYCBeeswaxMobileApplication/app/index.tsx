import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import i18n from "i18next";
import React from "react";
import { initReactI18next } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import "intl-pluralrules";

import Button from "@/components/button";
import LandingCarousel, { Item } from "@/components/landingCarousel";
import { useUser } from "@/firebase/providers/userProvider";
import deTranslation from "@/locales/de.json";
import enTranslation from "@/locales/en.json";
import esTranslation from "@/locales/es.json";
import frTranslation from "@/locales/fr.json";
import hiTranslation from "@/locales/hi.json";
import itTranslation from "@/locales/it.json";
import jaTranslation from "@/locales/ja.json";
import koTranslation from "@/locales/ko.json";
import nlTranslation from "@/locales/nl.json";
import ptTranslation from "@/locales/pt.json";
import ruTranslation from "@/locales/ru.json";
import trTranslation from "@/locales/tr.json";
import viTranslation from "@/locales/vi.json";
import zhTranslation from "@/locales/zh.json";
import { mainStyles } from "@/styles/mainStyles";
import { rootPageStyles } from "@/styles/rootPageStyles";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslation },
        fr: { translation: frTranslation },
        es: { translation: esTranslation },
        de: { translation: deTranslation },
        hi: { translation: hiTranslation },
        it: { translation: itTranslation },
        ja: { translation: jaTranslation },
        ko: { translation: koTranslation },
        nl: { translation: nlTranslation },
        pt: { translation: ptTranslation },
        ru: { translation: ruTranslation },
        zh: { translation: zhTranslation },
        tr: { translation: trTranslation },
        vi: { translation: viTranslation },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is missing
    interpolation: {
        escapeValue: false, // React already handles escaping
    },
});
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
