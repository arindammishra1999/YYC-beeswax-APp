import { SplashScreen, Stack, usePathname } from "expo-router";
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

    const mainPaths = new Set([
        "/",
        "/dashboard/HomePage",
        "/dashboard/CartPage",
        "/dashboard/MorePage",
        "/dashboard/ProfilePage",
    ]);

    return (
        <SafeAreaView style={mainStyles.container} onLayout={onLayoutRootView}>
            <UserProvider data={{ user }}>
                <Stack
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: !mainPaths.has(pathname),
                        animation: mainPaths.has(pathname) ? "none" : "default",
                    }}
                />
            </UserProvider>
        </SafeAreaView>
    );
}
