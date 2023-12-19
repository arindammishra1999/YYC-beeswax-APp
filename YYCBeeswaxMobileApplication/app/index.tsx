import { StatusBar } from "expo-status-bar";
import useAuth from "@/firebase/hooks/useAuth";
import React from "react";
import LoginPage from "./pages/LoginPage";
import Navbar from './components/navbar';
import { Text, SafeAreaView } from "react-native";
import { mainStyles } from "./styles/mainStyles";
import LanguagePage from "./pages/LanguagePage";

export default function App() {
    const { user } = useAuth();

    return (
        <SafeAreaView style={mainStyles.container}>
            <LanguagePage />
        </SafeAreaView>
    );
}
