import { Stack, usePathname, SplashScreen } from "expo-router";
import React, { useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import useAuth from "@/firebase/hooks/useAuth";
import { UserProvider } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user, loading } = useAuth();
    const pathname = usePathname();

    const onLayoutRootView = useCallback(async () => {
        if (!loading) {
            SplashScreen.hideAsync();
        }
    }, [loading]);

    if (loading) {
        return null;
    }

    const mainPaths = new Set([
        "/dashboard/HomePage",
        "/dashboard/MorePage",
        "/dashboard/ProfilePage",
        "/dashboard/CartPage",
    ]);

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={mainStyles.container}
                onLayout={onLayoutRootView}
            >
                <UserProvider data={{ user }}>
                    <Stack
                        initialRouteName="Home"
                        screenOptions={{
                            headerShown: false,
                            animation: mainPaths.has(pathname)
                                ? "none"
                                : "default",
                        }}
                    />
                </UserProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
