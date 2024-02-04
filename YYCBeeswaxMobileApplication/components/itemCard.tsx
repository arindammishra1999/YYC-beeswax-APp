import { router } from "expo-router";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { itemCardStyles } from "@/styles/components/itemCardStylex";

type Props = {
    image: any;
    id: string;
};

export default function ItemCard(props: Props) {
    return (
        <View style={itemCardStyles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/dashboard/product/${props.id}`);
                }}
            >
                <Image
                    resizeMode="contain"
                    source={{ uri: props.image }}
                    style={itemCardStyles.image}
                />
            </TouchableOpacity>
        </View>
    );
}
