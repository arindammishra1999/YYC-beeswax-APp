import { Stack } from "expo-router";
import React from "react";

import { QuizzesProvider } from "@/firebase/providers/quizzesProvider";

export default function Layout() {
    return (
        <QuizzesProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="knowledge/[quizId]"
                    options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                    name="personality/[quizId]"
                    options={{ gestureEnabled: false }}
                />
            </Stack>
        </QuizzesProvider>
    );
}
