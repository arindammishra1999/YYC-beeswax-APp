import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { categoryCardStyles } from "@/styles/components/categoryCardStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
    title: string;
    iconName: any;
};

export default function CategoryCard(props: Props) {
    return (
        <View style={categoryCardStyles.cardContainer}>
            <TouchableOpacity onPress={() => {}}>
                <Icon
                    name={props.iconName}
                    style={categoryCardStyles.icon}
                ></Icon>
                <Text style={categoryCardStyles.text} numberOfLines={1}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
