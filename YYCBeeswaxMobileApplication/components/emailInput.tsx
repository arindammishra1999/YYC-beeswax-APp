import React from "react";
import {SafeAreaView, TextInput} from "react-native";
import {accountStyles} from "@/styles/accountStyles";

export default function EmailInput(props: { emailInput: (value: string) => void }) {
    return (
        <SafeAreaView style={accountStyles.inputContainer}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={text => props.emailInput(text)}
                placeholder="Email"
                textContentType="emailAddress"
                style={accountStyles.textInput}
            />
        </SafeAreaView>
    );
}