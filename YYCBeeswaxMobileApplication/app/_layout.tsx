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
                        name="auth/emailVerification"
                        options={{
                            gestureEnabled: false,
                            animation: "slide_from_bottom",
                        }}
                    />
                    <Stack.Screen
                        name="quizzes/knowledge/[quizId]"
                        options={{ gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="quizzes/personality/[quizId]"
                        options={{ gestureEnabled: false }}
                    />
                </Stack>
            </UserProvider>
        </SafeAreaView>
    );
}
