import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { mainStyles } from "@/styles/mainStyles";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={mainStyles.container}>
                <Stack
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="/dashboard/HomePage"
                        options={{
                            animation: "none",
                        }}
                    />
                    <Stack.Screen name="/dashboard/ProfilePage" />
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
