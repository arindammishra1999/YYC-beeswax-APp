import { StatusBar } from "expo-status-bar";
import useAuth from "@/firebase/hooks/useAuth";
import React from "react";
import LoginPage from "./pages/LoginPage";
import Navbar from './components/navbar';
import { Text, SafeAreaView } from "react-native";
import { mainStyles } from "./styles/mainStyles";
import {Link} from "expo-router";

export default function App() {
    const { user } = useAuth();

    return (
        <View style={mainStyles.container}>
            <LoginPage />
            <Text>Hello World</Text>
                        <Text>{user?.uid || "Not Logged In"}</Text>
            <StatusBar style="auto" />
            <Navbar/>
            <Text>{user?.uid || 'Not Logged In'}</Text>
            <StatusBar style="auto"/>
            <Link href='/auth/forgotPassword'>Forgot</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
