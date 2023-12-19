import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

import { buttonStyles } from "@/styles/components/buttonStyles";

type Props = {
    title: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

function Button(props: Props) {
    return (
        <TouchableOpacity style={buttonStyles.button} onPress={props.onPress}>
            <Text style={buttonStyles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default Button;
