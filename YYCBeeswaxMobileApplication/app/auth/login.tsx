import { Link, router } from "expo-router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
    Alert,
    Keyboard,
    Text,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
} from "react-native";

import Button from "@/components/button";
import Divider from "@/components/divider";
import Header from "@/components/header";
import HideableInput from "@/components/hideableInput";
import Input from "@/components/input";
import { colors } from "@/consts/styles";
import { auth } from "@/firebase/config";
import { useLoginWithGoogle } from "@/firebase/hooks/loginWithGoogle";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { loginPageStyles } from "@/styles/loginPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [logoutSpinner, setLogoutSpinner] = useState(false);

    const { handleLoginGoogle } = useLoginWithGoogle();
    const { isAdmin } = useUser();

    const showAccountDisabledMessage = () =>
        Alert.alert(
            "Account Temporarily Disabled!",
            "Access to this account has been temporarily disabled due to too many failed login attempts. Please try again later.",
            [{ text: "OK", onPress: () => router.back() }],
        );

    async function login() {
        try {
            setLogoutSpinner(true);
            await signInWithEmailAndPassword(auth, email, password);
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
        } finally {
            setLogoutSpinner(false);
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                if (isAdmin) {
                    router.push("/dashboard/MorePage");
                } else if (user.emailVerified) {
                    router.push("/dashboard/HomePage");
                } else {
                    router.push("/auth/emailVerification");
                }
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [auth, router, isAdmin]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                {logoutSpinner && (
                    <View style={mainStyles.spinnerOverlay}>
                        <ActivityIndicator size="large" color={colors.yellow} />
                    </View>
                )}
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
