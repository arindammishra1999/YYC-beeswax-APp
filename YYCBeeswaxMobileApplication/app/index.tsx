import { StatusBar } from "expo-status-bar";
import useAuth from "@/firebase/hooks/useAuth";
import React from "react";
import LoginPage from "./pages/LoginPage";
import Navbar from './components/navbar';
import { View, Text, SafeAreaView } from "react-native";
import { mainStyles } from "./styles/mainStyles";
import {default as NotificationPage} from "./pages/NotificationPage";

export default function App() {
    const { user } = useAuth();

    return (
        <View style={mainStyles.container}>
            <NotificationPage/>
        </View>
    );
}
