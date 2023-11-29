import React from "react";
import {Text, TouchableOpacity, ViewStyle} from "react-native";
import {accountStyles} from "@/styles/accountStyles";
import {Link} from "expo-router";

type Props = {
    href: any
    title: string
    style: ViewStyle
}

function LinkButton(props: Props) {
    return (
        <Link href={props.href} asChild>
            <TouchableOpacity style={{...accountStyles.submitButton, ...props.style}}>
                <Text style={accountStyles.submitButtonText}>{props.title}</Text>
            </TouchableOpacity>
        </Link>
    );
}

export default LinkButton