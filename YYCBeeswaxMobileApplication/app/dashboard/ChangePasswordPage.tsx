import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
    Keyboard,
    Modal,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import HideableInput from "@/components/hideableInput";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { changePasswordPageStyles } from "@/styles/changePasswordPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successfulPopupVisible, setSuccessfulPopupVisible] = useState(false);
    const [reloginPopupVisible, setReloginPopupVisible] = useState(false);

    const { user } = useUser();

    async function changePassword() {
        try {
            if (!user) {
                setError("Password Reset Failed - Invalid user");
                return;
            }
            if (password == "") {
                setError("Password Reset Failed - Passwords is empty");
                return;
            }
            if (password != confirmPassword) {
                setError("Password Reset Failed - Passwords do not match");
                return;
            }
            await updatePassword(user, password);
            setSuccessfulPopupVisible(true);
        } catch (err: any) {
            console.log(err);
            if (err?.code == "auth/weak-password") {
                setError("Password Reset Failed - Weak Password");
            } else if (err?.code == "auth/requires-recent-login") {
                setReloginPopupVisible(true);
            } else {
                setError("Password Reset Failed");
            }
        }
    }

    async function changePasswordWithRelogin() {
        try {
            setReloginPopupVisible(false);
            if (!user?.email) {
                setError("Password Reset Failed - Invalid user");
                return;
            }
            const cred = EmailAuthProvider.credential(
                user.email,
                currentPassword,
            );
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, password);
            setSuccessfulPopupVisible(true);
        } catch (err: any) {
            console.log(err);
            if (err?.code == "auth/weak-password") {
                setError("Password Reset Failed - Weak Password");
            } else {
                setError("Password Reset Failed");
            }
        }
    }

    function returnToHome() {
        router.push("/dashboard/HomePage");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={mainStyles.container}>
                <Header header="Change Password" />
                <View style={accountStyles.form}>
                    <Fontisto
                        name="locked"
                        size={80}
                        color="black"
                        style={accountStyles.logo}
                    />
                    <Text style={accountStyles.text}>
                        Please enter your new password.
                    </Text>
                    <HideableInput
                        label="New Password"
                        placeholder="Enter New Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <HideableInput
                        label="Confirm New Password"
                        placeholder="Renter New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {error && <Text style={accountStyles.error}>{error}</Text>}
                </View>
                <Button title="Confirm" onPress={changePassword} />
                <Modal
                    animationType="slide"
                    visible={successfulPopupVisible}
                    transparent
                    onRequestClose={() => {
                        setSuccessfulPopupVisible(!successfulPopupVisible);
                    }}
                >
                    <View style={changePasswordPageStyles.viewContainer}>
                        <View style={changePasswordPageStyles.popupContainer}>
                            <Text style={changePasswordPageStyles.popupText}>
                                Password reset successful!
                            </Text>
                            <Button title="Confirm" onPress={returnToHome} />
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    visible={reloginPopupVisible}
                    transparent
                    onRequestClose={() => {
                        setReloginPopupVisible(!reloginPopupVisible);
                    }}
                >
                    <View style={changePasswordPageStyles.viewContainer}>
                        <View style={changePasswordPageStyles.popupContainer}>
                            <Text style={changePasswordPageStyles.popupText}>
                                Please enter your old password for account
                                verification.
                            </Text>
                            <HideableInput
                                label="Old Password"
                                placeholder="Enter Old Password"
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <Button
                                title="Confirm"
                                onPress={changePasswordWithRelogin}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
}
