import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

import { buttonStyles } from "@/styles/components/buttonStyles";

type Props = {
    href: any;
    title: string;
    style: ViewStyle;
};

function LinkButton(props: Props) {
    return (
        <Link href={props.href} asChild>
            <TouchableOpacity
                style={{ ...buttonStyles.button, ...props.style }}
            >
                <Text style={buttonStyles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </Link>
    );
}

export default LinkButton;
