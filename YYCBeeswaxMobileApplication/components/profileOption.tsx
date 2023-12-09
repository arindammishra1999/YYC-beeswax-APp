import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { profilePageStyles } from "@/styles/profilePageStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
    label: string;
    iconName: string;
    onPress: () => void;
};

export default function ProfileOption(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={profilePageStyles.option}>
                <Icon
                    name={props.iconName}
                    style={profilePageStyles.optionIcon}
                />
                <Text style={profilePageStyles.optionLabel}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}
