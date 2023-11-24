import React from "react";
import { TextInput, StyleSheet, Text, SafeAreaView } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";

import { useState } from "react";
import AppButton from "../components/AppButton";

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
    Header: {
        fontSize: 20,
        alignSelf: "center",
    },
});


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function Login() {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            console.log('user logged in');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.Header}>Log In</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                placeholder="email"
                textContentType="emailAddress"
            />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
            />
            <AppButton title="Login" onPress={Login} />
        </SafeAreaView>
    );
}

export default LoginScreen;
