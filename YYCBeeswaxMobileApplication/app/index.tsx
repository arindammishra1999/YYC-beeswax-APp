import React from "react";
import {Image, Text, View} from "react-native";
import {mainStyles} from "@/styles/mainStyles";
import LinkButton from "@/components/linkButton";

export default function App() {
    return (
        <View style={mainStyles.container}>
            <View style={{alignItems: 'center'}}>
                <Image
                    resizeMode='contain'
                    source={require("../assets/YYC_Full_logo_transparent.png")}
                    style={{
                        width: '80%',
                    }}
                />
            </View>
            <View style={{height: 300}}>
                <Text style={{textAlign: 'center'}}>Shop for all your favourite YYC Beeswax products</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                gap: 10,
                marginBottom: 20
            }}>
                <View style={{flex: 1}}>
                    <LinkButton title='Log in' href='/auth/login'/>
                </View>
                <View style={{flex: 1}}>
                    <LinkButton title='Browse as Guest' href='/'/>
                </View>
            </View>
            <Text style={{textAlign: 'center'}}>Don't have an account? Sign Up</Text>
        </View>
    );
}
