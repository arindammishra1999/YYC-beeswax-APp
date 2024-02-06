import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { getProductData } from "../../firebase/getCollections/getProducts";

import CartProductCard from "@/components/cartProductCard";
import Header from "@/components/header";
import TotalBillCard from "@/components/totalBillCard";
import { cartPageStyles } from "@/styles/cartPageStyles";

export default function CartPage() {
    const [emptyCart, setEmptyCart] = useState(true);
    const [cartItems, setCartItems] = useState<any[]>([]);

    const calculateTotalItemsCost = (items: any[]) => {
        return items.reduce(
            (total, item) => total + item.quantity * item.data.price,
            0
        );
    };

    const calculateGSTCost = (items: any[]) => {
        const totalItemsCost = calculateTotalItemsCost(items);
        const gstRate = 0.05;
        return totalItemsCost * gstRate;
    };

    const calculateTotalBill = (items: any[]) => {
        const totalItemsCost = calculateTotalItemsCost(items);
        const shippingFee = 10; // Set your shipping fee
        const gstCost = calculateGSTCost(items);

        return totalItemsCost + shippingFee + gstCost;
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        setCartItems((prevCartItems) => {
            return prevCartItems.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const handleRemoveProduct = async (productId: string) => {
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

        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== productId)
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchCartData = async () => {
                try {
                    const cartData = await SecureStore.getItemAsync("cart");

                    if (cartData) {
                        const parsedCart = JSON.parse(cartData) as {
                            productId: string;
                            quantity: number;
                        }[];

                        // Fetch product details for each item in the cart
                        const productDetails = await Promise.all(
                            parsedCart.map(async ({ productId, quantity }) => {
                                try {
                                    // Use getProductData to get product details
                                    const products = await getProductData();
                                    if (products) {
                                        // Check if products is not undefined
                                        const product = products.find(
                                            (product) =>
                                                product.id === productId
                                        );

                                        if (product) {
                                            return {
                                                ...product,
                                                quantity,
                                            };
                                        } else {
                                            // If the product is not found, you might want to handle it
                                            console.warn(
                                                `Product with ID ${productId} not found.`
                                            );
                                            return null;
                                        }
                                    } else {
                                        console.error("Products is undefined.");
                                        return null;
                                    }
                                } catch (error) {
                                    console.error(
                                        "Error fetching products:",
                                        error
                                    );
                                    return null;
                                }
                            })
                        );

                        // Filter out any null values (products not found)
                        const filteredProductDetails = productDetails.filter(
                            (product) => product !== null
                        );

                        setCartItems(filteredProductDetails);
                        setEmptyCart(filteredProductDetails.length === 0);
                    } else {
                        setEmptyCart(true);
                    }
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                    setEmptyCart(true);
                }
            };

            fetchCartData();
        }, [])
    );

    if (cartItems.length == 0) {
        return (
            <View style={cartPageStyles.container}>
                <Header header="Your Cart" noBackArrow />
                <Text style={cartPageStyles.messageText}>
                    Your cart is empty! Go ahead and check out our products.
                </Text>
                <Image
                    contentFit="contain"
                    source={require("@/assets/shopping.gif")}
                    style={cartPageStyles.gif}
                />
                <TouchableOpacity
                    style={cartPageStyles.button}
                    onPress={() => router.push("/dashboard/HomePage")}
                >
                    <Text style={cartPageStyles.buttonText}>Shop Now</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={cartPageStyles.container}>
                <View style={cartPageStyles.headerContainer}>
                    <Header header="Your Cart" noBackArrow />
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    {cartItems.map((product: any) => (
                        <CartProductCard
                            key={product.id}
                            id={product.id}
                            name={product.data.name}
                            image={product.data.url}
                            price={product.data.price}
                            quantity={product.quantity}
                            onQuantityChange={handleQuantityChange}
                            onRemoveProduct={handleRemoveProduct}
                        />
                    ))}
                    {cartItems.length > 0 && (
                        <TotalBillCard
                            totalItemsCost={calculateTotalItemsCost(cartItems)}
                            shippingCost={10}
                            gstCost={calculateGSTCost(cartItems)}
                            totalBill={calculateTotalBill(cartItems)}
                        />
                    )}
                </ScrollView>
            </View>
        );
    }
}
