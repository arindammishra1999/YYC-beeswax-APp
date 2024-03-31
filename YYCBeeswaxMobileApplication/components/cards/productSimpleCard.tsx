import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

import { getProductDataById } from "@/firebase/getCollections/getProductByID";
import { productSimpleCardStyles } from "@/styles/components/productSimpleCardStyles";

type Props = {
    id: string;
    image: any;
    name: string;
    price: number;
};

export default function ProductSimpleCard(props: Props) {
    const { t } = useTranslation();
    const [invalidStock, setInvalidStock] = useState(false);

    useEffect(() => {
        (async () => {
            const productInfo = await getProductDataById(props.id);
            if (productInfo && productInfo.stock <= 0) {
                setInvalidStock(true);
            }
        })();
    }, []);

    return (
        <View style={productSimpleCardStyles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/product/${props.id}/`);
                }}
                style={[invalidStock && productSimpleCardStyles.invalidStock]}
                disabled={invalidStock}
            >
                <Image
                    contentFit="contain"
                    source={{ uri: props.image }}
                    style={productSimpleCardStyles.image}
                />

                <Text style={productSimpleCardStyles.title}>{props.name}</Text>
                {invalidStock && (
                    <Text style={productSimpleCardStyles.invalidText}>
                        {t("Out of Stock")}
                    </Text>
                )}
                {!invalidStock && (
                    <Text style={productSimpleCardStyles.price}>
                        ${(Math.round(props.price * 100) / 100).toFixed(2)}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
