import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";

import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import { db } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";
import { accountStyles } from "@/styles/accountStyles";

export default function EditProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const { user } = useUser();

    async function login() {
        const userId = user?.uid;
        try {
            if (!userId) {
                setError("User Not Found");
                return;
            }
            if (firstName == "" && lastName == "") {
                setError("Fields are empty");
                return;
            }
            await setDoc(
                doc(db, "users", userId),
                {
                    ...(firstName != "" && { firstName }),
                    ...(lastName != "" && { lastName }),
                },
                { merge: true },
            );
            router.push("/dashboard/ProfileDataPage");
        } catch {
            setError("Failed to update profile");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={accountStyles.container}>
                <Header header="Edit Profile" />
                <View style={accountStyles.form}>
                    <Input
                        label="First Name"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize={false}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize={false}
                    />
                    {error && <Text style={accountStyles.error}>{error}</Text>}
                </View>
                <Button title="Confirm" onPress={login} />
            </View>
        </TouchableWithoutFeedback>
    );
}
