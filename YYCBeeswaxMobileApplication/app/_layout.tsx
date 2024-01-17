import { Stack, usePathname } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { mainStyles } from "@/styles/mainStyles";

export default function RootLayout() {
    const pathname = usePathname();
    const mainPaths = new Set([
        "/dashboard/HomePage",
        "/dashboard/MorePage",
        "/dashboard/ProfilePage",
        "/dashboard/CartPage",
    ]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={mainStyles.container}>
                <Stack
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                        animation: mainPaths.has(pathname) ? "none" : "default",
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
