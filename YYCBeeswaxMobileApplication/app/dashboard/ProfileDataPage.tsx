import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import Header from "@/components/header";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { loginPageStyles } from "@/styles/loginPageStyles";
import { profileDataPageStyles } from "@/styles/profileDataPageStyles";
import { accountStyles } from "@/styles/accountStyles";

export default function ProfileDataPage() {
    const [userDetails, setUserDetails] = useState<IUser>({
        email: "Loading",
        firstName: "Loading",
        lastName: "Loading",
    });

    const { user } = useUser();

    useEffect(() => {
        (async () => {
            if (user?.uid) {
                const userDetails = await getUserById(user.uid);
                if (userDetails) {
                    setUserDetails(userDetails);
                } else {
                    setUserDetails({
                        email: "Not Found",
                        firstName: "Not Found",
                        lastName: "Not Found",
                    });
                }
            }
        })();
    }, [user]);

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
                </View>
                <View style={profileDataPageStyles.buttonContainer}>
                    <Link href="/dashboard/EditProfilePage" asChild>
                        <Text style={loginPageStyles.forgot}>Edit Profile</Text>
                    </Link>
                    <Link href="/dashboard/ChangePasswordPage" asChild>
                        <Text style={loginPageStyles.forgot}>
                            Change password
                        </Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}
