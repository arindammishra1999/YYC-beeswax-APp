import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import Header from "@/components/header";
import Popup from "@/components/popup";
import ProfileOption from "@/components/profileOption";
import { colors } from "@/consts/styles";
import { auth } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";
import { profilePageStyles } from "@/styles/profilePageStyles";

export default function ProfilePage() {
    const { user } = useUser();
    const { t } = useTranslation();
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);
    const [logoutSpinner, setLogoutSpinner] = useState(false);

    async function logout() {
        try {
            setLogoutSpinner(true);
            setLogoutPopupVisible(false);
            await signOut(auth);
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLogoutSpinner(false);
        }
        router.replace("/");
    }

    if (!user) {
        return (
            <View style={mainStyles.container}>
                <Header header={t("yourProfile")} noBackArrow />
                <Text style={profilePageStyles.messageText}>
                    {t("guestMessage")}
                </Text>
                <TouchableOpacity
                    style={profilePageStyles.button}
                    onPress={() => router.push("/auth/login")}
                >
                    <Text style={profilePageStyles.buttonText}>
                        {t("login")}
                    </Text>
                </TouchableOpacity>
                <View style={profilePageStyles.signUpContainer}>
                    <Text style={profilePageStyles.signUpText}>
                        {t("noAccount")}{" "}
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={profilePageStyles.signUpLink}
                            onPress={() => router.push("/auth/signup")}
                        >
                            {t("signUp")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={mainStyles.container}>
                {logoutSpinner && (
                    <View style={mainStyles.spinnerOverlay}>
                        <ActivityIndicator size="large" color={colors.yellow} />
                    </View>
                )}
                <Header header={t("yourProfile")} noBackArrow />
                <Ionicons
                    name="person-outline"
                    style={profilePageStyles.largeIcon}
                />
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() => router.push("/profile/OrderHistoryPage")}
                        label={t("orderHistory")}
                        iconName="history"
                    />
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() => router.push("/profile/EditProfilePage")}
                        label={t("myAccount")}
                        iconName="edit"
                    />
                    <ProfileOption
                        onPress={() => router.push("/profile/NotificationPage")}
                        label={t("notifications")}
                        iconName="notifications"
                    />
                    <ProfileOption
                        onPress={() => router.push("/profile/LanguagePage")}
                        label={t("language")}
                        iconName="language"
                    />
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() =>
                            WebBrowser.openBrowserAsync(
                                "https://yycwax.com/about/frequently-asked-questions/",
                            )
                        }
                        label={t("help&Support")}
                        iconName="help-outline"
                    />
                    <ProfileOption
                        onPress={() =>
                            WebBrowser.openBrowserAsync(
                                "https://yycwax.com/contact-us/",
                            )
                        }
                        label={t("contactUs")}
                        iconName="message"
                    />
                    <ProfileOption
                        onPress={() =>
                            router.push("/profile/PrivacyPolicyPage")
                        }
                        label={t("privacyPolicy")}
                        iconName="lock-outline"
                    />
                </View>
                <View style={profilePageStyles.optionContainer}>
                    <ProfileOption
                        onPress={() => setLogoutPopupVisible(true)}
                        label={t("logout")}
                        iconName="logout"
                    />
                </View>
                <Popup
                    subTitle={t("logoutConfirmation")}
                    option1Text={t("no")}
                    option2Text={t("yes")}
                    visible={logoutPopupVisible}
                    changeVisibility={() => setLogoutPopupVisible(false)}
                    option1Action={() => setLogoutPopupVisible(false)}
                    option2Action={logout}
                />
            </View>
        );
    }
}
