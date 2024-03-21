import { Image } from "expo-image";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity, Text } from "react-native";

import Popup from "@/components/popup";
import { cartProductCardStyles } from "@/styles/components/cartProductCardStyles";

type Props = {
    id: any;
    image: any;
    price: number;
    name: string;
    quantity: number;
    choices?: { title: string; name: string }[];
    onQuantityChange: (productId: any, newQuantity: number) => void;
    onRemoveProduct: (productId: any) => void;
};

export default function CartProductCard(props: Props) {
    const { t } = useTranslation();
    const [showPopup, setShowPopup] = useState(false);

    const updateSecureStore = async (productId: string, quantity: number) => {
        try {
            const cartData = await SecureStore.getItemAsync("cart");

            if (cartData) {
                const parsedCart = JSON.parse(cartData) as {
                    productId: string;
                    quantity: number;
                    choices?: { title: string; name: string }[];
                }[];

                const updatedCart = parsedCart.map((item) =>
                    item.productId === productId ? { ...item, quantity } : item,
                );

                await SecureStore.setItemAsync(
                    "cart",
                    JSON.stringify(updatedCart),
                );
            }
        } catch (error) {
            console.error("Error updating cart data in SecureStore:", error);
        }
    };

    const removeProductFromSecureStore = async (productId: string) => {
        try {
            const cartData = await SecureStore.getItemAsync("cart");

            if (cartData) {
                const parsedCart = JSON.parse(cartData) as {
                    productId: string;
                    quantity: number;
                    choices?: { title: string; name: string }[];
                }[];

                const updatedCart = parsedCart.filter(
                    (item) => item.productId !== productId,
                );

                await SecureStore.setItemAsync(
                    "cart",
                    JSON.stringify(updatedCart),
                );
            }
        } catch (error) {
            console.error("Error removing product from SecureStore:", error);
        }
    };

    function increase() {
        const newQuantity = props.quantity + 1;
        props.onQuantityChange(props.id, newQuantity);
        updateSecureStore(props.id, newQuantity);
    }

    function decrease() {
        if (props.quantity > 1) {
            const newQuantity = props.quantity - 1;
            props.onQuantityChange(props.id, newQuantity);
            updateSecureStore(props.id, newQuantity);
        } else {
            setShowPopup(true);
        }
    }

    function confirmRemoveFromCart() {
        props.onRemoveProduct(props.id);
        removeProductFromSecureStore(props.id);
        setShowPopup(false);
    }

    return (
        <TouchableOpacity
            onPress={() => {
                router.push(`/product/${props.id}/`);
            }}
        >
            <View style={cartProductCardStyles.cardContainer}>
                <Image
                    contentFit="contain"
                    source={{ uri: props.image }}
                    style={cartProductCardStyles.image}
                />
                <View style={cartProductCardStyles.infoContainer}>
                    <Text style={cartProductCardStyles.title}>
                        {props.name}
                    </Text>
                    {props?.choices?.map((variant) => (
                        <View
                            style={cartProductCardStyles.variantsContainer}
                            key={variant.name + variant.title}
                        >
                            <View
                                style={cartProductCardStyles.variantContainer}
                            >
                                <Text
                                    style={cartProductCardStyles.variantsTitle}
                                >
                                    {variant.title}
                                </Text>
                                <Text
                                    style={cartProductCardStyles.variantsType}
                                >
                                    {variant.name}
                                </Text>
                            </View>
                        </View>
                    ))}
                    <View style={cartProductCardStyles.subInfoContainer}>
                        <Text style={cartProductCardStyles.price}>
                            ${(Math.round(props.price * 100) / 100).toFixed(2)}
                        </Text>
                        <View
                            style={cartProductCardStyles.productQuantitySection}
                        >
                            <TouchableOpacity
                                style={cartProductCardStyles.quantityButton}
                                onPress={decrease}
                            >
                                <Text
                                    style={
                                        cartProductCardStyles.quantityButtonText
                                    }
                                >
                                    -
                                </Text>
                            </TouchableOpacity>
                            <Text style={cartProductCardStyles.productQuantity}>
                                {props.quantity !== undefined
                                    ? props.quantity.toString().padStart(2, "0")
                                    : "N/A"}
                            </Text>
                            <TouchableOpacity
                                style={cartProductCardStyles.quantityButton}
                                onPress={increase}
                            >
                                <Text
                                    style={
                                        cartProductCardStyles.quantityButtonText
                                    }
                                >
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Popup
                    visible={showPopup}
                    changeVisibility={() => setShowPopup(false)}
                    option1Text={t("Cancel")}
                    option2Text={t("Remove")}
                    option1Action={() => setShowPopup(false)}
                    option2Action={confirmRemoveFromCart}
                    title={t("Remove from Cart")}
                    subTitle={t(
                        "Are you sure you want to remove this item from your cart?",
                    )}
                />
            </View>
        </TouchableOpacity>
    );
}
