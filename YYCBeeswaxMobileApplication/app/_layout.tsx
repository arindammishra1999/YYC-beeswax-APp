import { Slot, SplashScreen } from "expo-router";
import { useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import useAuth from "@/firebase/hooks/useAuth";
import { UserProvider } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user, loading } = useAuth();

    const onLayoutRootView = useCallback(async () => {
        if (!loading) {
            SplashScreen.hideAsync();
        }
    }, [loading]);

    if (loading) {
        return null;
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={mainStyles.container}
                onLayout={onLayoutRootView}
            >
                <UserProvider data={{ user }}>
                    <Slot />
                </UserProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
