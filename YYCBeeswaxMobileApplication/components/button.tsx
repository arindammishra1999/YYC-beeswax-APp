import React from "react";
import {GestureResponderEvent, Text, TouchableOpacity} from "react-native";
import {accountStyles} from "@/styles/accountStyles";

type Props = {
    title: string
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

function Button(props: Props) {
    return (
        <TouchableOpacity style={accountStyles.submitButton} onPress={props.onPress}>
            <Text style={accountStyles.submitButtonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default Button