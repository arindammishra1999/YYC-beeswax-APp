import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import { sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { Text, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { emailVerificationPageStyles } from "@/styles/emailVerificationPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function EmailVerification() {
    const [error, setError] = useState("");
    const { user } = useUser();

    async function resend() {
        if (user) {
            try {
                await sendEmailVerification(user);
            } catch (e) {
                console.error(e);
                setError("Email Resend Failed.");
            }
        } else {
            setError("User is invalid.");
        }
    }

    return (
        <View style={accountStyles.container}>
            <Header header="Email Verification" noBackArrow />
            <View style={accountStyles.form}>
                <Fontisto
                    name="email"
                    style={emailVerificationPageStyles.icon}
                />
                <Text style={emailVerificationPageStyles.heading}>
                    We have sent an email to
                    <Text style={mainStyles.bold}> {user?.email}</Text>
                </Text>
                <Text style={emailVerificationPageStyles.subtitle}>
                    You need to verify your email to make purchases. If you have
                    not received the verification email, please check your
                    "Spam" folder.
                </Text>
                {error && <Text style={accountStyles.error}>{error}</Text>}
                <View style={emailVerificationPageStyles.buttonsContainer}>
                    <Button
                        title="Skip for now"
                        onPress={() => {
                            router.push("/dashboard/HomePage");
                        }}
                    />
                    <Text style={accountStyles.forgot} onPress={resend}>
                        Resend verification email
                    </Text>
                </View>
            </View>
        </View>
    );
}
