import React from "react";
import {Image, Text, View} from "react-native";
import {mainStyles} from "@/styles/mainStyles";
import LinkButton from "@/components/linkButton";
import {Link} from "expo-router";
import {rootPageStyles} from "@/styles/rootPageStyles";

export default function App() {
    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.center}>
                <Image
                    resizeMode='contain'
                    source={require("../assets/YYC_Full_logo_transparent.png")}
                    style={rootPageStyles.image}
                />
            </View>
            <View style={rootPageStyles.caption}>
                <Text style={mainStyles.centerText}>Shop for all your favourite YYC Beeswax products</Text>
            </View>
            <View style={rootPageStyles.buttonGroup}>
                <LinkButton title='Log in' href='/auth/login' style={rootPageStyles.button}/>
                <LinkButton title='Browse as Guest' href='/dashboard/HomePage' style={rootPageStyles.button}/>
            </View>
            <Link href='/auth/signup' asChild>
                <Text style={mainStyles.centerText}>Don't have an account? Sign Up</Text>
            </Link>
        </View>
    );
}
