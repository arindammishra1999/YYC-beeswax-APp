import { router } from "expo-router";
//import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

import { cartProductCardStyles } from "@/styles/components/cartProductCardStyles";
// import { mainStyles } from "@/styles/mainStyles";

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

    const updateSecureStore = async (productId: string, quantity: number) => {
        try {
            const cartData = await SecureStore.getItemAsync("cart");

            if (cartData) {
                const parsedCart = JSON.parse(cartData) as {
                    productId: string;
                    quantity: number;
                }[];

                const updatedCart = parsedCart.map((item) =>
                    item.productId === productId ? { ...item, quantity } : item
                );

                await SecureStore.setItemAsync(
                    "cart",
                    JSON.stringify(updatedCart)
                );
            }
        } catch (error) {
            console.error("Error updating cart data in SecureStore:", error);
        }
    };

    const removeProductFromSecureStore = async (productId: string) => {
        // Remove the product from SecureStore
        try {
            const cartData = await SecureStore.getItemAsync("cart");

            if (cartData) {
                const parsedCart = JSON.parse(cartData) as {
                    productId: string;
                    quantity: number;
                }[];

                const updatedCart = parsedCart.filter(
                    (item) => item.productId !== productId
                );

                await SecureStore.setItemAsync(
                    "cart",
                    JSON.stringify(updatedCart)
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
            setLocalQuantity(0);
            props.onRemoveProduct(props.id);
            removeProductFromSecureStore(props.id);
        }
    }

    return (
        <View style={cartProductCardStyles.cardContainer}>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/dashboard/product/${props.id}`);
                }}
            >
                <Image
                    resizeMode="contain"
                    source={{ uri: props.image }}
                    style={cartProductCardStyles.image}
                />
                <Text style={cartProductCardStyles.title}>{props.name}</Text>
                <Text style={cartProductCardStyles.price}>
                    ${(Math.round(props.price * 100) / 100).toFixed(2)}
                </Text>
                <View style={cartProductCardStyles.productQuantitySection}>
                    <TouchableOpacity
                        style={cartProductCardStyles.quantityButton}
                        onPress={decrease}
                    >
                        <Text style={cartProductCardStyles.quantityButtonText}>
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
                        <Text style={cartProductCardStyles.quantityButtonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}
