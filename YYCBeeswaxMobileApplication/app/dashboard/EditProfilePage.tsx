import { getDatabase, ref, set } from "@firebase/database";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import useAuth from "@/firebase/hooks/useAuth";
import { accountStyles } from "@/styles/accountStyles";
import { loginPageStyles } from "@/styles/loginPageStyles";

export default function EditProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const { user } = useAuth();

    async function login() {
        const userId = user?.uid;
        if (!userId) {
            return;
        }
        try {
            const db = getDatabase();
            await set(ref(db, "users/" + userId), {
                ...(firstName && { firstName }),
                ...(lastName && { firstName }),
                ...(email && { firstName }),
            });
            router.push("/dashboard/HomePage");
        } catch (err: any) {
            setError("Failed to update profile");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header header="Edit Profile" />
                <View style={accountStyles.form}>
                    <Input
                        label="First Name"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize={false}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize={false}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize={false}
                    />
                    <Link href="/dashboard/ChangePasswordPage" asChild>
                        <Text style={loginPageStyles.forgot}>
                            Change password
                        </Text>
                    </Link>
                    {error && <Text style={accountStyles.error}>{error}</Text>}
                </View>
                <Button title="Confirm" onPress={login} />
            </View>
        </TouchableWithoutFeedback>
    );
}
