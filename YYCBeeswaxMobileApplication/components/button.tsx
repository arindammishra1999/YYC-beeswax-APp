import React from "react";
import {
    GestureResponderEvent,
    StyleProp,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

import { buttonStyles } from "@/styles/components/buttonStyles";

type Props = {
    title: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
};

function Button(props: Props) {
    return (
        <TouchableOpacity
            style={[buttonStyles.button, props.style]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={[buttonStyles.buttonText, props.textStyle]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
