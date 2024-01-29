import { SplashScreen, Stack } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAuth from "@/firebase/hooks/useAuth";
import { UserProvider } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user, loading } = useAuth();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => true,
        );
        return () => backHandler.remove();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (!loading) {
            SplashScreen.hideAsync();
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    return (
        <SafeAreaView style={mainStyles.container} onLayout={onLayoutRootView}>
            <UserProvider data={{ user }}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{ gestureEnabled: false, animation: "none" }}
                    />
                    <Stack.Screen
                        name="dashboard/HomePage"
                        options={{ gestureEnabled: false, animation: "none" }}
                    />
                    <Stack.Screen
                        name="dashboard/CartPage"
                        options={{ gestureEnabled: false, animation: "none" }}
                    />
                    <Stack.Screen
                        name="dashboard/MorePage"
                        options={{ gestureEnabled: false, animation: "none" }}
                    />
                    <Stack.Screen
                        name="dashboard/ProfilePage"
                        options={{ gestureEnabled: false, animation: "none" }}
                    />
                    <Stack.Screen
                        name="dashboard/LanguagePage"
                        options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="dashboard/NotificationPage"
                        options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="auth/emailVerification"
                        options={{
                            gestureEnabled: false,
                            animation: "slide_from_bottom",
                        }}
                    />
                    <Stack.Screen
                        name="dashboard/quizzes/knowledge/[quizId]"
                        options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="dashboard/quizzes/personality/[quizId]"
                        options={{ gestureEnabled: false }}
                    />
                </Stack>
            </UserProvider>
        </SafeAreaView>
    );
}
