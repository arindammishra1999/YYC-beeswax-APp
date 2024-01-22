import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Popup from "@/components/popup";
import ProfileOption from "@/components/profileOption";
import { auth } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";
import { profilePageStyles } from "@/styles/profilePageStyles";

export default function ProfilePage() {
    const { user } = useUser();
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);

    function logout() {
        signOut(auth);
        router.replace("/");
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
                    onPress={() => router.push("/auth/login")}
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
                            onPress={() => router.push("/auth/signup")}
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
                        onPress={() =>
                            router.push("/dashboard/OrderHistoryPage")
                        }
                        label="Order History"
                        iconName="history"
                    />
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() =>
                            router.push("/dashboard/ProfileDataPage")
                        }
                        label="Edit Profile"
                        iconName="edit"
                    />
                    <ProfileOption
                        onPress={() =>
                            router.push("/dashboard/NotificationPage")
                        }
                        label="Notifications"
                        iconName="notifications"
                    />
                    <ProfileOption
                        onPress={() => router.push("/dashboard/LanguagePage")}
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
                            router.push("/dashboard/PrivacyPolicyPage")
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
                <Popup
                    subTitle="Are you sure you want to logout? This will take you back
                    to the login screen."
                    option1Text="No"
                    option2Text="Yes"
                    visible={logoutPopupVisible}
                    changeVisibility={() => setLogoutPopupVisible(false)}
                    option1Action={() => setLogoutPopupVisible(false)}
                    option2Action={logout}
                />
                <Navbar currentPage="Profile" />
            </View>
        );
    }
}
