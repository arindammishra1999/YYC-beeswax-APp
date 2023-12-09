import React, { Component } from "react";
import {Text, TextInput, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { profilePageStyles } from "@/styles/profilePageStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
    label: string
    iconName: string
}

export default function ProfileOption(props: Props) {
    return (
        <TouchableOpacity>
            <View style={profilePageStyles.option}>
                    <Icon name={props.iconName} style={profilePageStyles.optionIcon}/>
                    <Text style={profilePageStyles.optionLabel}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}
