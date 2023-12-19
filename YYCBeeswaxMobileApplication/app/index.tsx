import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import LinkButton from "@/components/linkButton";
import { mainStyles } from "@/styles/mainStyles";
import { rootPageStyles } from "@/styles/rootPageStyles";

export default function App() {
    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.center}>
                <Image
                    resizeMode="contain"
                    source={require("../assets/YYC_Full_logo_transparent.png")}
                    style={rootPageStyles.image}
                />
            </View>
            <View style={rootPageStyles.caption}>
                <Text style={mainStyles.centerText}>
                    Shop for all your favourite YYC Beeswax products
                </Text>
            </View>
            <View style={rootPageStyles.buttonGroup}>
                <LinkButton
                    title="Login"
                    href="/auth/login"
                    style={rootPageStyles.button}
                />
                <LinkButton
                    title="Browse as Guest"
                    href="/dashboard/HomePage"
                    style={rootPageStyles.button}
                />
            </View>
            <View style={rootPageStyles.textGroup}>
                <Text style={rootPageStyles.signupText}>
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                    <Text style={rootPageStyles.signupLinkText}> Sign Up</Text>
                </TouchableOpacity>
            </View>
            {/* <Link href='/auth/signup' asChild>
                <Text style={{...mainStyles.centerText, color:'blue',textDecorationLine: 'underline'}}>Don't have an account? Sign Up</Text>
            </Link> */}
        </View>
    );
}
 