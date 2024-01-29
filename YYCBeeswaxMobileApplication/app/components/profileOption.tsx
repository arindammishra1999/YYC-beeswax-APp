import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { profilePageStyles } from "@/styles/profilePageStyles";

type Props = {
    label: string;
    iconName: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
};

export default function ProfileOption(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={profilePageStyles.option}>
                <MaterialIcons
                    name={props.iconName}
                    style={profilePageStyles.optionIcon}
                />
                <Text style={profilePageStyles.optionLabel}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}
