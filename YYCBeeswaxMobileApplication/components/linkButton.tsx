import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {accountStyles} from "@/styles/accountStyles";
import {Link} from "expo-router";

type Props = {
    href: any
    title: string
}

function LinkButton(props: Props) {
    return (
        <Link href={props.href} asChild>
            <TouchableOpacity style={accountStyles.submitButton}>
                <Text style={accountStyles.submitButtonText}>{props.title}</Text>
            </TouchableOpacity>
        </Link>
    );
}

export default LinkButton