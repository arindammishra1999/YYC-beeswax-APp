import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/core";
import { router } from "expo-router";
import { sendEmailVerification, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Keyboard,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ScrollView,
} from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import { db } from "@/firebase/config";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { editProfilePageStyles } from "@/styles/editProfilePageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function EditProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [confirmPressed, setConfirmPressed] = useState(false);

    const { user } = useUser();

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            if (user?.uid) {
                const userDetails = await getUserById(user.uid);
                if (userDetails) {
                    setName(userDetails.name);
                    setEmail(userDetails.email);
                }
            }
        })();
    }, [isFocused, confirmPressed]);

    async function login() {
        const userId = user?.uid;
        try {
            if (!userId) {
                setError("User Not Found");
                return;
            }
            if (name == "" || email == "") {
                setError("Fields are empty");
                return;
            }
            let emailUpdateSuccess = true;
            if (email !== user?.email) {
                try {
                    await updateEmail(user, email);
                } catch (err: any) {
                    emailUpdateSuccess = false;
                    if (err.code === "auth/operation-not-allowed") {
                        Alert.alert(
                            "Error!",
                            "You must verify the current email address before you can change it.",
                            [{ text: "OK" }],
                        );
                    } else if (err.code === "auth/invalid-email") {
                        Alert.alert(
                            "Error!",
                            "You must enter a valid email address.",
                            [{ text: "OK" }],
                        );
                    } else {
                        console.log(err.code, err.message);
                        setError(
                            "Failed to update account information. Please try again later.",
                        );
                    }
                }
            }
            if (emailUpdateSuccess) {
                setError("");
                await setDoc(
                    doc(db, "users", userId),
                    {
                        ...(name != "" && { name }),
                        ...(email != "" && { email }),
                    },
                    { merge: true },
                );

                Alert.alert(
                    "Success!",
                    "Your account information has been updated.",
                    [{ text: "OK" }],
                );
            }
        } catch {
            setError(
                "Failed to update account information. Please try again later.",
            );
        }
        setConfirmPressed(!confirmPressed);
    }

    async function emailVerificationPressed() {
        if (!user) {
            Alert.alert(
                "Verification Email Error!",
                "Verification Email Failed - User is invalid.",
                [{ text: "OK" }],
            );
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
                Alert.alert(
                    "Verification Email Error!",
                    "Verification Email Failed - There were too many requests, please try again later.",
                    [{ text: "OK" }],
                );
            } else {
                Alert.alert(
                    "Verification Email Error!",
                    "Verification Email Failed - User is invalid.",
                    [{ text: "OK" }],
                );
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={mainStyles.container}>
                <Header header="My Account" />
                <ScrollView contentContainerStyle={accountStyles.formContainer}>
                    <MaterialIcons
                        name="account-edit-outline"
                        style={editProfilePageStyles.icon}
                    />
                    {!user?.emailVerified ? (
                        <View style={editProfilePageStyles.emailNotVerifiedBox}>
                            <Text
                                style={
                                    editProfilePageStyles.emailNotVerifiedText
                                }
                            >
                                The email for this account is not verified. You
                                must have a verified email to make purchases.
                            </Text>
                            <TouchableOpacity
                                onPress={() => emailVerificationPressed()}
                                style={editProfilePageStyles.verifyEmailButton}
                            >
                                <Text
                                    style={
                                        editProfilePageStyles.verifyEmailText
                                    }
                                >
                                    Verify Email
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={editProfilePageStyles.emailVerifiedText}>
                            This email is verified!
                        </Text>
                    )}
                    <View style={editProfilePageStyles.form}>
                        <Input
                            label="Email"
                            placeholder={email}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize={false}
                            placeholderColor="#000000"
                        />
                        <Input
                            label="Name"
                            placeholder={name}
                            value={name}
                            onChangeText={setName}
                            autoCapitalize={false}
                            placeholderColor="#000000"
                        />
                        {error && (
                            <Text style={accountStyles.error}>{error}</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            router.push("/profile/ChangePasswordPage")
                        }
                        style={editProfilePageStyles.changePassword}
                    >
                        <Text style={accountStyles.forgot}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <Button
                    style={editProfilePageStyles.confirmButton}
                    title="Confirm Changes"
                    onPress={login}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
