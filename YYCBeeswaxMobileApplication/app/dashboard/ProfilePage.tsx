import { Ionicons } from "@expo/vector-icons";
import Linking from "expo-linking";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import Header from "@/components/header";
import Navbar from "@/components/navbar";
import ProfileOption from "@/components/profileOption";
import { auth } from "@/firebase/config";
import useAuth from "@/firebase/hooks/useAuth";
import { logoutPopupStyles } from "@/styles/components/logoutPopupStyles";
import { mainStyles } from "@/styles/mainStyles";
import { profilePageStyles } from "@/styles/profilePageStyles";

export default function ProfilePage() {
    const { user } = useAuth();
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);

    function logout() {
        signOut(auth);
        router.push("/");
    }

    if (!user) {
        return (
            <View style={mainStyles.container}>
                <Header header="Your Profile" noBackArrow />
                <Text style={profilePageStyles.messageText}>
                    You are currently browsing as a guest! Login or create an
                    account to view your profile and save your settings.
                </Text>
                <TouchableOpacity
                    style={profilePageStyles.button}
                    onPress={() => router.replace("/auth/login")}
                >
                    <Text style={profilePageStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={profilePageStyles.signUpContainer}>
                    <Text style={profilePageStyles.signUpText}>
                        Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={profilePageStyles.signUpLink}
                            onPress={() => router.replace("/auth/signup")}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Navbar currentPage="Profile" />
            </View>
        );
    } else {
        return (
            <View style={mainStyles.container}>
                <Header header="Your Profile" noBackArrow />
                <Ionicons
                    name="person-outline"
                    style={profilePageStyles.largeIcon}
                />
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() => router.push("/")}
                        label="Order History"
                        iconName="history"
                    />
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() =>
                            router.push("/dashboard/EditProfilePage")
                        }
                        label="Edit Profile"
                        iconName="edit"
                    />
                    <ProfileOption
                        onPress={() => router.push("./NotificationPage")}
                        label="Notifications"
                        iconName="notifications"
                    />
                    <ProfileOption
                        onPress={() => router.push("./LanguagePage")}
                        label="Language"
                        iconName="language"
                    />
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() =>
                            Linking.openURL(
                                "https://yycwax.com/about/frequently-asked-questions/",
                            )
                        }
                        label="Help & Support"
                        iconName="help-outline"
                    />
                    <ProfileOption
                        onPress={() =>
                            Linking.openURL("https://yycwax.com/contact-us/")
                        }
                        label="Contact Us"
                        iconName="message"
                    />
                    <ProfileOption
                        onPress={() =>
                            Linking.openURL(
                                "https://yycwax.com/privacy-policy/",
                            )
                        }
                        label="Privacy Policy"
                        iconName="lock-outline"
                    />
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() => setLogoutPopupVisible(true)}
                        label="Logout"
                        iconName="logout"
                    />
                </View>
                <Modal
                    animationType="slide"
                    visible={logoutPopupVisible}
                    transparent
                    onRequestClose={() => {
                        setLogoutPopupVisible(!logoutPopupVisible);
                    }}
                >
                    <View style={logoutPopupStyles.viewContainer}>
                        <TouchableWithoutFeedback
                            onPress={() => setLogoutPopupVisible(false)}
                        >
                            <View style={logoutPopupStyles.touchableOverlay} />
                        </TouchableWithoutFeedback>
                        <View style={logoutPopupStyles.popupView}>
                            <Text style={logoutPopupStyles.popupText}>
                                Are you sure you want to logout? This will take
                                you back to the login screen.
                            </Text>
                            <View style={logoutPopupStyles.buttonContainer}>
                                <TouchableOpacity
                                    style={logoutPopupStyles.button}
                                    onPress={() =>
                                        setLogoutPopupVisible(
                                            !logoutPopupVisible,
                                        )
                                    }
                                >
                                    <Text
                                        style={
                                            logoutPopupStyles.buttonTextStyle
                                        }
                                    >
                                        No
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={logoutPopupStyles.button}
                                    onPress={logout}
                                >
                                    <Text
                                        style={
                                            logoutPopupStyles.buttonTextStyle
                                        }
                                    >
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Navbar currentPage="Profile" />
            </View>
        );
    }
}
