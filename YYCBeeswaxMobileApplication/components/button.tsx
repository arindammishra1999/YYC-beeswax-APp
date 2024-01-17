import React from "react";
import {
    GestureResponderEvent,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

import { buttonStyles } from "@/styles/components/buttonStyles";

type Props = {
    title: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    style?: ViewStyle;
};

function Button(props: Props) {
    return (
        <TouchableOpacity
            style={{ ...buttonStyles.button, ...props.style }}
            onPress={props.onPress}
        >
            <Text style={buttonStyles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default Button;
