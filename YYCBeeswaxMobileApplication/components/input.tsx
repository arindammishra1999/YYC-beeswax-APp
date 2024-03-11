import React from "react";
import { StyleProp, Text, TextInput, View, ViewStyle } from "react-native";

import { inputStyles } from "@/styles/components/inputStyles";

export enum KeyboardTypeOptions {
    emailAddress = "email-address",
    phonePad = "phone-pad",
}

type Props = {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText?: (value: string) => void;
    autoCapitalize: boolean;
    placeholderColor?: string;
    inputStyle?: StyleProp<ViewStyle>;
    multiline?: boolean;
    keyboardType?: KeyboardTypeOptions;
};

function Input(props: Props) {
    return (
        <View style={[inputStyles.inputContainer]}>
            <Text style={[inputStyles.label]}>{props.label}</Text>
            <TextInput
                style={[inputStyles.input, props.inputStyle]}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                autoCapitalize={props.autoCapitalize ? "words" : "none"}
                placeholderTextColor={
                    props.placeholderColor ? props.placeholderColor : undefined
                }
                multiline={props.multiline}
                textAlignVertical={props.multiline ? "top" : "center"}
                keyboardType={
                    props.keyboardType ? props.keyboardType : "default"
                }
            />
        </View>
    );
}

export default Input;
