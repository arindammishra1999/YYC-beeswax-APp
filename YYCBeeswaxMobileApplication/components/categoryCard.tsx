import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { categoryCardStyles } from "@/styles/components/categoryCardStyles";

type Props = {
    title: string;
    iconName: any;
};

export default function CategoryCard(props: Props) {
    return (
        <View style={categoryCardStyles.cardContainer}>
            <TouchableOpacity onPress={() => {}}>
                <Icon name={props.iconName} style={categoryCardStyles.icon} />
                <Text style={categoryCardStyles.text} numberOfLines={1}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
