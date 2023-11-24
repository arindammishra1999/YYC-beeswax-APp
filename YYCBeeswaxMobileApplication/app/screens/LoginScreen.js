import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";

import { useState } from "react";
import AppButton from "../components/AppButton";

function LoginScreen(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <Screen style={styles.container}>
            <Text style={styles.Header}>Log In</Text>
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                icon="email"
                placeholder="email"
                textContentType="emailAddress"
            />
            <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
            />
            <AppButton title="Login" onPress={() => console.log(email, password)} />
        </Screen>
    );
}

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

export default LoginScreen;
