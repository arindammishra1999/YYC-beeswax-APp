import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useAuth from "@/firebase/hooks/useAuth";
import { mainStyles } from "@/styles/mainStyles";
import { profilePageStyles } from "@/styles/profilePageStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "@/components/header";
import ProfileOption from "@/components/profileOption";
import * as Linking from "expo-linking";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return (
            <View style={mainStyles.container}>
                <Header header="Your Profile" />
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
            </View>
        );
    } else {
        return (
            <View>
                <Header header="Your Profile" />
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
                        onPress={() => router.push("/")}
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
                        onPress={() => router.push("/")}
                        label="Logout"
                        iconName="logout"
                    />
                </View>
            </View>
        );
    }
}
