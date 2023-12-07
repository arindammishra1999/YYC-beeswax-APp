import React, { Component } from "react";
import {Text, TextInput, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { profilePageStyles } from "@/styles/profilePageStyles";

type Props = {
    label: string
    iconName: string
}

export default function ProfileOption(props: Props) {
    return (
        <View style={profilePageStyles.option}>
            <Icon name={props.iconName} style={profilePageStyles.optionIcon}/>
            <Text style={profilePageStyles.optionLabel}>{props.label}</Text>
        </View>
    );
}
