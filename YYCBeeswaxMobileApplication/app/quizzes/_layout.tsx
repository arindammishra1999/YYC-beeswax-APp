import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="knowledge/[quizId]/index"
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name="personality/[quizId]/index"
                options={{ gestureEnabled: false }}
            />
        </Stack>
    );
}
