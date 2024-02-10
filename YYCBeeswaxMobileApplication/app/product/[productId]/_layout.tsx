import { Stack } from "expo-router";
import React from "react";

import { ReviewsProvider } from "@/firebase/providers/reviewsProvider";

export default function Layout() {
    return (
        <ReviewsProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="SetUserReview"
                    options={{
                        gestureEnabled: false,
                        animation: "slide_from_bottom",
                    }}
                />
            </Stack>
        </ReviewsProvider>
    );
}
