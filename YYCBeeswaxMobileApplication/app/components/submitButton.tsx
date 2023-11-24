import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { accountStyles } from "../styles/accountStyles";

export default function SubmitButton(props: { title: string, handleClick: any}) {
    return (
        <TouchableOpacity style={accountStyles.submitButton} onPress={props.handleClick}>
            <Text style={accountStyles.submitButtonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}
