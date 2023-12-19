import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { navbarStyles } from "@/styles/components/navbarStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
    iconName: string;
    onPress: () => void;
    color: string
};

export default function NavbarOption(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Icon
                name={props.iconName}
                style={navbarStyles.optionIcon}
                color={props.color}
            />
        </TouchableOpacity>
    );
}
