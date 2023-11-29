import React from "react";
import {SafeAreaView, TextInput} from "react-native";
import {accountStyles} from "@/styles/accountStyles";

export default function PasswordInput(props: { passwordInput: (value: string) => void }) {
    return (
        <SafeAreaView style={accountStyles.inputContainer}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => props.passwordInput(text)}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                style={accountStyles.textInput}
            />
        </SafeAreaView>
    );
}