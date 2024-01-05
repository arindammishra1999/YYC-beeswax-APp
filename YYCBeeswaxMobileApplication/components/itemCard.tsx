import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { itemCardStyles } from "@/styles/components/itemCardStylex";

type Props = {
    image: any;
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
            </TouchableOpacity>
        </View>
    );
}
