import { StatusBar } from "expo-status-bar";
import useAuth from "@/firebase/hooks/useAuth";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import Navbar from './components/navbar';

export default function App() {
    const { user } = useAuth();
    return <LoginScreen />;

    /*
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
            <Text>{user?.uid || "Not Logged In"}</Text>
            <StatusBar style="auto" />
            <Text>{user?.uid || 'Not Logged In'}</Text>
            <StatusBar style="auto"/>
            <Navbar/>
        </View>
    );*/
}
