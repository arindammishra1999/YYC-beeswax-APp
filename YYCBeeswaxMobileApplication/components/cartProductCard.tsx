import { Image } from "expo-image";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import Popup from "@/components/popup";
import { cartProductCardStyles } from "@/styles/components/cartProductCardStyles";

type Props = {
    id: any;
    image: any;
    price: number;
    name: string;
    quantity: number;
    onQuantityChange: (productId: any, newQuantity: number) => void;
    onRemoveProduct: (productId: any) => void;
};

export default function CartProductCard(props: Props) {
    const [localQuantity, setLocalQuantity] = useState(props.quantity);
    const [showPopup, setShowPopup] = useState(false);

    const updateSecureStore = async (productId: string, quantity: number) => {
        try {
            const cartData = await SecureStore.getItemAsync("cart");

            if (cartData) {
                const parsedCart = JSON.parse(cartData) as {
                    productId: string;
                    quantity: number;
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
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        props.onQuantityChange(props.id, newQuantity);
        updateSecureStore(props.id, newQuantity);
    }

    function decrease() {
        if (localQuantity > 1) {
            const newQuantity = localQuantity - 1;
            setLocalQuantity(newQuantity);
            props.onQuantityChange(props.id, newQuantity);
            updateSecureStore(props.id, newQuantity);
        } else {
            setShowPopup(true);
        }
    }

    function confirmRemoveFromCart() {
        setLocalQuantity(0);
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
                    option1Text="Cancel"
                    option2Text="Remove"
                    option1Action={() => setShowPopup(false)}
                    option2Action={confirmRemoveFromCart}
                    title="Remove from Cart"
                    subTitle="Are you sure you want to remove this item from your cart?"
                />
            </View>
        </TouchableOpacity>
    );
}
