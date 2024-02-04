import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { View, TouchableOpacity } from "react-native";

import { navbarStyles } from "@/styles/components/navbarStyles";

type Props = {
    iconName: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    color: string;
};

export default function NavbarOption(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={navbarStyles.optionHitbox}>
                <MaterialIcons
                    name={props.iconName}
                    style={navbarStyles.optionIcon}
                    color={props.color}
                />
            </View>
        </TouchableOpacity>
    );
}
