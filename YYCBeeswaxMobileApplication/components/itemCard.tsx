import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { itemCardStyles } from "@/styles/components/itemCardStylex";

type Props = {
    title: string;
    image: any;
};

export default function ItemCard(props: Props) {
    return (
        <View style={itemCardStyles.cardContainer}>
            <TouchableOpacity onPress={() => {}}>
                <Image
                    resizeMode="contain"
                    source={props.image}
                    style={itemCardStyles.image}
                />
                <Text style={itemCardStyles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}
