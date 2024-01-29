import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { categoryCardStyles } from "@/styles/components/categoryCardStyles";

type Props = {
    title: string;
    iconName: any;
};

export default function CategoryCard(props: Props) {
    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`/pages/product/${props.title}`);
            }}
        >
            <View style={categoryCardStyles.cardContainer}>
                <MaterialCommunityIcons
                    name={props.iconName}
                    style={categoryCardStyles.icon}
                />
                <Text style={categoryCardStyles.text} numberOfLines={1}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
