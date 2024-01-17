import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

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

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace("../dashboard/HomePage");
        } catch (err: any) {
            console.log(err);
            if (err?.code === "auth/invalid-email") {
                setError("Login Failed - Enter a valid email.");
            } else if (err?.code === "auth/missing-password") {
                setError("Login Failed - Must input a password.");
            } else if (err?.code === "auth/invalid-login-credentials") {
                setError("Login Failed - Username or password did not match.");
            }
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
