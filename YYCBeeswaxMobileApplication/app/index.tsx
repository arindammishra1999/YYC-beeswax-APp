import { StatusBar } from "expo-status-bar";
import useAuth from "@/firebase/hooks/useAuth";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import Navbar from './components/navbar';
import { Text, SafeAreaView } from "react-native";
import { mainStyles } from "./styles/mainStyles";

export default function App() {
    const { user } = useAuth();

    return (
        <SafeAreaView style={mainStyles.container}>
            <LoginScreen />
            <Text>Hello World</Text>
            <Text>{user?.uid || "Not Logged In"}</Text>
            <StatusBar style="auto" />
            <Navbar/>
        </SafeAreaView>
    );
}
