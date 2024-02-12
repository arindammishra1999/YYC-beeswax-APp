import { SplashScreen, Stack, usePathname } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import useAuth from "@/firebase/hooks/useAuth";
import { UserProvider } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user, loading, isAdmin } = useAuth();
    const pathname = usePathname();

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
        <GestureHandlerRootView
            style={mainStyles.container}
            onLayout={onLayoutRootView}
        >
            <SafeAreaView style={mainStyles.container}>
                <UserProvider data={{ user, isAdmin }}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            gestureEnabled: !(
                                pathname.startsWith("/product/") &&
                                pathname.endsWith("SetUserReview")
                            ),
                        }}
                    >
                        <Stack.Screen
                            name="index"
                            options={{
                                gestureEnabled: false,
                                animation: "none",
                            }}
                        />
                                         <Stack.Screen
                        name="admin"
                        options={{
                            gestureEnabled: false,
                            animation: "none",
                        }}
                    />
                        <Stack.Screen
                            name="dashboard"
                            options={{
                                gestureEnabled: false,
                                animation: "none",
                            }}
                        />
                        <Stack.Screen
                            name="auth/emailVerification"
                            options={{
                                gestureEnabled: false,
                                animation: "slide_from_bottom",
                            }}
                        />
                    </Stack>
                </UserProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
