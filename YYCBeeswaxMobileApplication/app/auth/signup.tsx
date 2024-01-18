import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";
import React, { useState } from "react";
import { Text, ScrollView, View, Alert } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import HideableInput from "@/components/hideableInput";
import Input from "@/components/input";
import { accountStyles } from "@/styles/accountStyles";
import { loginPageStyles } from "@/styles/loginPageStyles";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const router = useRouter();

    async function signup() {
        try {
            const database = getDatabase();
            const auth = getAuth();

            if (!firstName || !lastName) {
                setError("First name and Last name are required.");
                return;
            }

            // Validate if password and confirm password match
            if (password !== confirmedPassword) {
                setError("Passwords do not match");
                return; // Exit the function if passwords don't match
            }

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            // Save user info to the database
            const usersRef = ref(database, "users"); // Reference to 'users' collection
            if (userCredential?.user) {
                const { uid } = userCredential.user;
                await push(usersRef, {
                    userId: uid,
                    firstName,
                    lastName,
                    email,
                });
            }

            setSignupSuccess(true);
            Alert.alert(
                "Sign Up Successful",
                "You have successfully signed up!",
                [
                    {
                        text: "OK",
                        onPress: () => router.push("../dashboard/HomePage"),
                    },
                ],
            );
        } catch (error: any) {
            console.error("Error creating user:", error);
            // Handle different error cases
            if (error.code === "auth/invalid-email") {
                setError("Signup Failed - Enter a valid email.");
            } else if (error.code === "auth/missing-password") {
                setError("Signup Failed - No password entered.");
            } else if (error.code === "auth/weak-password") {
                setError("Signup Failed - Password is too weak.");
            } else if (error.code === "auth/email-already-in-use") {
                setError("Signup Failed - Email is already in use.");
            } else {
                setError("Error creating user. Please try again.");
            }
        }
    }

    return (
        <View style={accountStyles.container}>
            <Header header="Create Account" />
            <ScrollView>
                <View style={accountStyles.form}>
                    <Input
                        label="First Name"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize
                    />
                    <Input
                        label="Last Name"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize
                    />
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
                    <HideableInput
                        label="Confirm Password"
                        placeholder="Re-enter Password"
                        value={confirmedPassword}
                        onChangeText={setConfirmedPassword}
                    />
                    {error && <Text style={accountStyles.error}>{error}</Text>}
                    {signupSuccess && (
                        <View style={loginPageStyles.centered}>
                            <Text>You have successfully signed up!</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <Button title="Create Account" onPress={signup} />
        </View>
    );
}
