import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

import { navbarStyles } from "@/styles/components/navbarStyles";

type Props = {
    iconName: string;
    onPress: () => void;
    color: string;
};

export default function NavbarOption(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={navbarStyles.optionHitbox}>
                <Icon
                    name={props.iconName}
                    style={navbarStyles.optionIcon}
                    color={props.color}
                />
            </View>
        </TouchableOpacity>
    );
}
