import React from "react";
import {Image, Text, View, TouchableOpacity} from "react-native";
import {mainStyles} from "@/styles/mainStyles";
import LinkButton from "@/components/linkButton";
import {rootPageStyles} from "@/styles/rootPageStyles";
import {router} from 'expo-router';

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
                <LinkButton title='Login' href='/auth/login' style={rootPageStyles.button}/>
                <LinkButton title='Browse as Guest' href='/dashboard/HomePage' style={rootPageStyles.button}/>
            </View>
            <View style={rootPageStyles.textGroup}>
                <Text style={rootPageStyles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/auth/signup')}> 
                    <Text style={rootPageStyles.signupLinkText}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
