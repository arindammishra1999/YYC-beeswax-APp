import { Link } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

import Header from "@/components/header";
import { db } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";
import { loginPageStyles } from "@/styles/loginPageStyles";
import { mainStyles } from "@/styles/mainStyles";
import { profileDataPageStyles } from "@/styles/profileDataPageStyles";

export default function ProfileDataPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const { user } = useUser();
    const email = user?.email ?? "Not Found";

    useEffect(() => {
        (async () => {
            const userId = user?.uid;
            if (userId) {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userdata: {
                        firstName?: string;
                        lastName?: string;
                    } = docSnap.data();
                    setFirstName(userdata.firstName ?? "Not Found");
                    setLastName(userdata.lastName ?? "Not Found");
                } else {
                    setFirstName("Not Found");
                    setLastName("Not Found");
                }
            }
        })();
    }, [user]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={mainStyles.container}>
                <Header header="User Profile" />
                <View style={profileDataPageStyles.mainContainer}>
                    <View style={profileDataPageStyles.dataContainer}>
                        <Text style={profileDataPageStyles.mainText}>
                            First Name:
                        </Text>
                        <Text style={profileDataPageStyles.text}>
                            {firstName}
                        </Text>
                        <Text style={profileDataPageStyles.mainText}>
                            Last Name:
                        </Text>
                        <Text style={profileDataPageStyles.text}>
                            {lastName}
                        </Text>
                        <Text style={profileDataPageStyles.mainText}>
                            Email:
                        </Text>
                        <Text style={profileDataPageStyles.text}>{email}</Text>
                    </View>
                    <View style={profileDataPageStyles.buttonContainer}>
                        <Link href="/dashboard/EditProfilePage" asChild>
                            <Text style={loginPageStyles.forgot}>
                                Edit Profile
                            </Text>
                        </Link>
                        <Link href="/dashboard/ChangePasswordPage" asChild>
                            <Text style={loginPageStyles.forgot}>
                                Change password
                            </Text>
                        </Link>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
