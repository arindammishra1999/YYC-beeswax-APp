import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Skeleton from "@/components/skeleton";
import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { itemCardStyles } from "@/styles/components/itemCardStylex";

type Props = {
    image: any;
    title: string;
    price: number;
    id: string;
    onRefresh: (productId: string) => Promise<boolean>;
};

export default function ItemCard(props: Props) {
    const [invalidStock, setInvalidStock] = useState(false);

    useEffect(() => {
        (async () => {
            const productInfo = await getProductDataById(props.id);
            if (productInfo && productInfo.stock <= 0) {
                setInvalidStock(true);
            } else {
                setInvalidStock(false);
            }
        })();
    }, [props.onRefresh]);

    return (
        <View style={itemCardStyles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/product/${props.id}/`);
                }}
                style={[invalidStock && itemCardStyles.invalidStock]}
                disabled={invalidStock}
            >
                <Image
                    contentFit="cover"
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
                {invalidStock && (
                    <Text style={itemCardStyles.invalidText}>Out of stock</Text>
                )}
                {!invalidStock && (
                    <Text style={itemCardStyles.price}>
                        ${props.price.toFixed(2)}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

export function LoadingItemCard() {
    return (
        <View style={itemCardStyles.cardContainer}>
            <Skeleton style={itemCardStyles.image} />
            <Skeleton height={16} width="80%" style={itemCardStyles.title} />
            <Skeleton height={16} width="40%" style={itemCardStyles.title} />
        </View>
    );
}
