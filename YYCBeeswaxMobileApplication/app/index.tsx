import { StatusBar } from "expo-status-bar";
import useAuth from "@/firebase/hooks/useAuth";
import React from "react";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
    const { user } = useAuth();
    return <LoginScreen />;

    /*
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <Text>{user?.uid || "Not Logged In"}</Text>
            <StatusBar style="auto" />
        </View>
    );*/
}
