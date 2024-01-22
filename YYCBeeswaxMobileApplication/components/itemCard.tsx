import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

import { itemCardStyles } from "@/styles/components/itemCardStylex";

type Props = {
    image: any;
    title: string;
    price: number;
};

export default function ItemCard(props: Props) {
    return (
        <View style={itemCardStyles.cardContainer}>
            <TouchableOpacity onPress={() => {}}>
                <Image
                    resizeMode="contain"
                    source={{ uri: props.image }}
                    style={itemCardStyles.image}
                />
                <Text style={itemCardStyles.title}>{props.title}</Text>
                <Text style={itemCardStyles.price}>
                    {props.price.toString().padStart(2, "0")}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
