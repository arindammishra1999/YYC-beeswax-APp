import {Slot} from 'expo-router';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {mainStyles} from "@/styles/mainStyles";

export default function RootLayout() {
    return <SafeAreaProvider>
        <SafeAreaView style={mainStyles.container}>
            <Slot/>
        </SafeAreaView>
    </SafeAreaProvider>
}