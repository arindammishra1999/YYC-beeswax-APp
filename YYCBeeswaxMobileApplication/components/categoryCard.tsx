import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { categoryCardStyles } from "@/styles/components/categoryCardStyles";

type Props = {
    title: string;
    iconName: any;
};

export let selectedCategory: string = "";

export default function CategoryCard(props: Props) {
    return (
        <TouchableOpacity
            onPress={() => {
                selectedCategory = props.title;
                router.push("/dashboard/CategoryPage");
            }}
        >
            <View style={categoryCardStyles.cardContainer}>
                <Icon name={props.iconName} style={categoryCardStyles.icon} />
                <Text style={categoryCardStyles.text} numberOfLines={1}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
