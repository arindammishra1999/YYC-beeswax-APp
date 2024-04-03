import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/core";
import { router } from "expo-router";
import { sendEmailVerification, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Alert,
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
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
    const { t } = useTranslation();
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
                            t("Error!"),
                            t(
                                "You must verify the current email address before you can change it.",
                            ),
                            [{ text: t("OK") }],
                        );
                    } else if (err.code === "auth/invalid-email") {
                        Alert.alert(
                            t("Error!"),
                            t("You must enter a valid email address."),
                            [{ text: t("OK") }],
                        );
                    } else {
                        console.log(err.code, err.message);
                        setError(
                            t(
                                "Failed to update account information. Please try again later.",
                            ),
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
                    t("Success!"),
                    t("Your account information has been updated."),
                    [{ text: "OK" }],
                );
            }
        } catch {
            setError(
                t(
                    "Failed to update account information. Please try again later.",
                ),
            );
        }
        setConfirmPressed(!confirmPressed);
    }

    async function emailVerificationPressed() {
        if (!user) {
            Alert.alert(
                t("Verification Email Error!"),
                t("Verification Email Failed - User is invalid."),
                [{ text: t("OK") }],
            );
            return;
        }
        try {
            await sendEmailVerification(user);
            Alert.alert(
                t("Email Sent Successfully!"),
                t(
                    "Please click on the link that has been sent to your email account to verify your email.",
                ),
                [{ text: t("OK") }],
            );
        } catch (err: any) {
            console.error(err);
            if (err?.code === "auth/too-many-requests") {
                Alert.alert(
                    t("Verification Email Error!"),
                    t(
                        "Verification Email Failed - There were too many requests, please try again later.",
                    ),
                    [{ text: t("OK") }],
                );
            } else {
                Alert.alert(
                    t("Verification Email Error!"),
                    t("Verification Email Failed - User is invalid."),
                    [{ text: t("OK") }],
                );
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={mainStyles.container}>
                <Header header={t("My Account")} />
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
                                {t(
                                    "The email for this account is not verified. You must have a verified email to make purchases.",
                                )}
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
                                    {t("Verify Email")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={editProfilePageStyles.emailVerifiedText}>
                            {t("This email is verified!")}
                        </Text>
                    )}
                    <View style={editProfilePageStyles.form}>
                        <Input
                            label={t("Email")}
                            placeholder={email}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize={false}
                            placeholderColor="#000000"
                        />
                        <Input
                            label={t("Name")}
                            placeholder={name}
                            value={name}
                            onChangeText={setName}
                            autoCapitalize={false}
                            placeholderColor="#000000"
                        />
                        {error && (
                            <Text style={accountStyles.error}>{t(error)}</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            router.push("/profile/ChangePasswordPage")
                        }
                        style={editProfilePageStyles.changePassword}
                    >
                        <Text style={accountStyles.forgot}>
                            {t("Change Password")}
                        </Text>
                    </TouchableOpacity>
                    <View style={editProfilePageStyles.confirmButtonContainer}>
                        <Button
                            style={editProfilePageStyles.confirmButton}
                            title={t("Confirm Changes")}
                            onPress={login}
                        />
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
