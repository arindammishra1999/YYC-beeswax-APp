import React from "react";
import {SafeAreaView, TextInput} from "react-native";
import {accountStyles} from "@/styles/accountStyles";

type Props = { passwordInput: (value: string) => void }

export default function PasswordInput(props: Props) {
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