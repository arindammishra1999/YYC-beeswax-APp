import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View } from "react-native";

import LandingPage from "./LandingPage";
import HomePage from "./dashboard/HomePage";

import useAuth from "@/firebase/hooks/useAuth";
import { UserProvider } from "@/firebase/userProvider";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const { user, loading } = useAuth();

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    }, []);

    // const onLayoutRootView = useCallback(async () => {
    //     if (!loading) {
    //         // This tells the splash screen to hide immediately! If we call this after
    //         // `setAppIsReady`, then we may see a blank screen while the app is
    //         // loading its initial state and rendering its first pixels. So instead,
    //         // we hide the splash screen once we know the root view has already
    //         // performed layout.
    //         await SplashScreen.hideAsync();
    //     }
    // }, [loading]);

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        // <SafeAreaView style={mainStyles.container} onLayout={onLayoutRootView}>
        <UserProvider data={{ user }}>
            {user ? <HomePage /> : <LandingPage />}
        </UserProvider>
        // </SafeAreaView>
    );
}
