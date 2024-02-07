import { Slot } from "expo-router";
import React from "react";

import { ReviewsProvider } from "@/firebase/providers/reviewsProvider";

export default function Layout() {
    return (
        <ReviewsProvider>
            <Slot />
        </ReviewsProvider>
    );
}
