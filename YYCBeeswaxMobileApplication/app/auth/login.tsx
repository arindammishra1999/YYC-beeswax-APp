import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
    Alert,
    Keyboard,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import Button from "@/components/button";
import Divider from "@/components/divider";
import Header from "@/components/header";
import HideableInput from "@/components/hideableInput";
import Input from "@/components/input";
import { auth } from "@/firebase/config";
import { useLoginWithGoogle } from "@/firebase/hooks/loginWithGoogle";
import { accountStyles } from "@/styles/accountStyles";
import { loginPageStyles } from "@/styles/loginPageStyles";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { handleLoginGoogle } = useLoginWithGoogle();

    const showAccountDisabledMessage = () =>
        Alert.alert(
            "Account Temporarily Disabled!",
            "Access to this account has been temporarily disabled due to too many failed login attempts. Please try again later.",
            [{ text: "OK", onPress: () => router.back() }],
        );

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("../dashboard/HomePage");
        } catch (err: any) {
            console.log(err);
            if (err?.code === "auth/invalid-email") {
                setError("Login Failed - Please enter a valid email.");
            } else if (err?.code === "auth/missing-password") {
                setError("Login Failed - You must input a password.");
            } else if (err?.code === "auth/invalid-login-credentials") {
                setError("Login Failed - Username and password did not match.");
            } else if (err?.code === "auth/invalid-credential") {
                setError("Login Failed - Username and password did not match.");
            } else if (err?.code === "auth/too-many-requests")
                showAccountDisabledMessage();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header header="Login" />
                <View style={accountStyles.form}>
                    <Input
                        label="Email"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize={false}
                    />
                    <HideableInput
                        label="Password"
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Link href="/auth/forgotPassword" asChild>
                        <Text style={loginPageStyles.forgot}>
                            Forgot password?
                        </Text>
                    </Link>
                    {error && <Text style={accountStyles.error}>{error}</Text>}
                </View>
                <Button title="Login" onPress={login} />
                <Divider />
                <Button title="Login with Google" onPress={handleLoginGoogle} />
            </View>
        </TouchableWithoutFeedback>
    );
}
