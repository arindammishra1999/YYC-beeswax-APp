import React, { useState } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import useAuth from "@/firebase/hooks/useAuth";
import { mainStyles } from "@/styles/mainStyles";
import { profilePageStyles } from "@/styles/profilePageStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "@/components/header";
import ProfileOption from "@/components/profileOption";
import * as Linking from "expo-linking";
import { logoutPopupStyles } from "@/styles/components/logoutPopupStyles";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import Navbar from "@/components/navbar";

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
                <Header header="Your Profile" noBackArrow={true} />
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
                <Navbar currentPage="Profile"/>
            </View>
        );
    } else {
        return (
            <View style={mainStyles.container}>
                <Header header="Your Profile" noBackArrow={true} />
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
                        onPress={() => router.push("/")}
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
                                "https://yycwax.com/about/frequently-asked-questions/"
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
                                "https://yycwax.com/privacy-policy/"
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
                    transparent={true}
                    onRequestClose={() => {
                        setLogoutPopupVisible(!logoutPopupVisible);
                    }}
                >
                    <View style={logoutPopupStyles.viewContainer}>
                        <TouchableWithoutFeedback
                            onPress={() => setLogoutPopupVisible(false)}
                        >
                            <View
                                style={logoutPopupStyles.touchableOverlay}
                            ></View>
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
                                            !logoutPopupVisible
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
                <Navbar currentPage="Profile"/>
            </View>
        );
    }
}
