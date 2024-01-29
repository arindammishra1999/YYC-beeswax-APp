import { router } from "expo-router";
import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

import { itemCardStyles } from "@/styles/components/itemCardStylex";

type Props = {
    image: any;
    title: string;
    price: number;
    id: string;
};

export default function ItemCard(props: Props) {
    return (
        <View style={itemCardStyles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/pages/product/${props.id}`);
                }}
            >
                <Image
                    resizeMode="cover"
                    source={{ uri: props.image }}
                    style={itemCardStyles.image}
                />
                <Text
                    style={itemCardStyles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.title}
                </Text>
                <Text style={itemCardStyles.price}>
                    ${props.price.toFixed(2)}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
