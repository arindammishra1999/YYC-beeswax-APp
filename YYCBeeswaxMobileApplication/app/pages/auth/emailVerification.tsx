import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import { sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

import Button from "@/app/components/button";
import Header from "@/app/components/header";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { emailVerificationPageStyles } from "@/styles/emailVerificationPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function EmailVerification() {
    const [error, setError] = useState("");
    const { user } = useUser();

    async function resend() {
        if (!user) {
            setError("Email Resend Failed - User is invalid.");
            return;
        }
        try {
            await sendEmailVerification(user);
            Alert.alert(
                "Email Sent Successfully!",
                "Please click on the link that has been sent to your email account to verify your email.",
                [{ text: "OK" }],
            );
        } catch (err: any) {
            console.error(err);
            if (err?.code === "auth/too-many-requests") {
                setError("Email Resend Failed - Too many requests.");
            } else {
                setError("Email Resend Failed");
            }
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
                            router.push("/pages/dashboard/HomePage");
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
