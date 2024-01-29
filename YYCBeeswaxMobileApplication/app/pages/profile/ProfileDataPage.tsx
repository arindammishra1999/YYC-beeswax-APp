import { useIsFocused } from "@react-navigation/core";
import { Link } from "expo-router";
import { sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import Button from "@/app/components/button";
import Header from "@/app/components/header";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";
import { loginPageStyles } from "@/styles/loginPageStyles";
import { profileDataPageStyles } from "@/styles/profileDataPageStyles";

export default function ProfileDataPage() {
    const [userDetails, setUserDetails] = useState<IUser>({
        email: "Loading",
        firstName: "Loading",
        lastName: "Loading",
    });

    const { user } = useUser();

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            if (user?.uid) {
                const userDetails = await getUserById(user.uid);
                if (userDetails) {
                    setUserDetails(userDetails);
                    return;
                }
            }
            setUserDetails({
                email: "Not Found",
                firstName: "Not Found",
                lastName: "Not Found",
            });
        })();
    }, [isFocused]);

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
        <View style={accountStyles.container}>
            <Header header="User Profile" />
            <View style={profileDataPageStyles.mainContainer}>
                <View style={profileDataPageStyles.dataContainer}>
                    <Text style={profileDataPageStyles.mainText}>
                        First Name:
                    </Text>
                    <Text style={profileDataPageStyles.text}>
                        {userDetails.firstName}
                    </Text>
                    <Text style={profileDataPageStyles.mainText}>
                        Last Name:
                    </Text>
                    <Text style={profileDataPageStyles.text}>
                        {userDetails.lastName}
                    </Text>
                    <Text style={profileDataPageStyles.mainText}>Email:</Text>
                    <Text style={profileDataPageStyles.text}>
                        {userDetails.email}
                    </Text>
                    <Text
                        style={
                            user?.emailVerified
                                ? profileDataPageStyles.verifiedText
                                : profileDataPageStyles.notVerifiedText
                        }
                    >
                        {user?.emailVerified
                            ? "Email Verified!"
                            : "Email Not Verified"}
                    </Text>
                </View>
                {!user?.emailVerified && (
                    <Button
                        title="Verify Email"
                        onPress={emailVerificationPressed}
                    />
                )}
                <View style={profileDataPageStyles.buttonContainer}>
                    <Link href="/pages/profile/EditProfilePage" asChild>
                        <Text style={loginPageStyles.forgot}>Edit Profile</Text>
                    </Link>
                    <Link href="/pages/profile/ChangePasswordPage" asChild>
                        <Text style={loginPageStyles.forgot}>
                            Change password
                        </Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}
