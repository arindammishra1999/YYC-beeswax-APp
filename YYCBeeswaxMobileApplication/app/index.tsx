import React from "react";
import {Image, Text, View} from "react-native";
import {mainStyles} from "@/styles/mainStyles";
import LinkButton from "@/components/linkButton";
import {Link} from "expo-router";

export default function App() {
    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.center}>
                <Image
                    resizeMode='contain'
                    source={require("../assets/YYC_Full_logo_transparent.png")}
                    style={{width: '80%',}}
                />
            </View>
            <View style={{height: 300}}>
                <Text style={mainStyles.centerText}>Shop for all your favourite YYC Beeswax products</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                gap: 10,
                marginBottom: 20
            }}>
                <LinkButton title='Log in' href='/auth/login' style={{flex: 1}}/>
                <LinkButton title='Browse as Guest' href='/' style={{flex: 1}}/>
            </View>
            <Link href='/auth/signup' asChild>
                <Text style={mainStyles.centerText}>Don't have an account? Sign Up</Text>
            </Link>
        </View>
    );
}
