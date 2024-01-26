import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { moreOptionsStyles } from "@/styles/components/moreOptionsStyles";

type Props = {
    label: string;
    iconName: keyof typeof MaterialCommunityIcons.glyphMap;
    onPress: () => void;
};

export default function MoreOption(props: Props) {
    return (
        <TouchableOpacity
            style={moreOptionsStyles.optionContainer}
            onPress={props.onPress}
        >
            <View style={moreOptionsStyles.option}>
                <MaterialCommunityIcons
                    style={moreOptionsStyles.optionIcon}
                    color="black"
                    name={props.iconName}
                />
                <Text style={moreOptionsStyles.optionLabel}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}
