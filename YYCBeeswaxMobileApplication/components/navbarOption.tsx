import React from "react";
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
            <Icon
                name={props.iconName}
                style={navbarStyles.optionIcon}
                color={props.color}
            />
        </TouchableOpacity>
    );
}
