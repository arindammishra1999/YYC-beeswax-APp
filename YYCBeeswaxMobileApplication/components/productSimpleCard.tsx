import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { productSimpleCardStyles } from "@/styles/components/productSimpleCardStyles";

type Props = {
    id: string;
    image: any;
    name: string;
    price: number;
};

export default function ProductSimpleCard(props: Props) {
    return (
        <View style={productSimpleCardStyles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/dashboard/product/${props.id}`);
                }}
            >
                <Image
                    resizeMode="contain"
                    source={{ uri: props.image }}
                    style={productSimpleCardStyles.image}
                />
                <Text style={productSimpleCardStyles.title}>{props.name}</Text>
                <Text style={productSimpleCardStyles.price}>
                    ${(Math.round(props.price * 100) / 100).toFixed(2)}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
