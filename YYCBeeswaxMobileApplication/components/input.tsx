import React from "react";
import {Text, TextInput, View} from "react-native";
import {inputStyles} from "@/styles/components/inputStyles";

type Props = {
    label: string
    placeholder: string
    value?: string
    onChangeText?: (value: string) => void
    autoCapitalize: boolean
}

function Input(props: Props) {
    return (
        <View style={inputStyles.inputContainer}>
            <Text style={inputStyles.label}>{props.label}</Text>
            <TextInput style={inputStyles.input} placeholder={props.placeholder} value={props.value}
                       onChangeText={props.onChangeText} autoCapitalize={props.autoCapitalize? 'words' : 'none'}/>
        </View>
    );
}

export default Input