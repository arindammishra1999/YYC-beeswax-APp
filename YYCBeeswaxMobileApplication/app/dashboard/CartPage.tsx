import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";
import { router } from "expo-router";
import Header from "@/components/header";
import { cartPageStyles } from "@/styles/cartPageStyles";

export default function CartPage() {
    const [emptyCart, setEmptyCart] = useState(true);

    if (emptyCart) {
        return (
            <View style={cartPageStyles.container}>
                <Header header="Your Cart" noBackArrow={true} />
                <Text style={cartPageStyles.messageText}>
                    Your cart is empty! Go ahead and check out our products.
                </Text>
                <Image
                    resizeMode="contain"
                    source={require("@/assets/shopping.gif")}
                    style={cartPageStyles.gif}
                />
                <TouchableOpacity
                    style={cartPageStyles.button}
                    onPress={() => router.replace("./HomePage")}
                >
                    <Text style={cartPageStyles.buttonText}>Shop Now</Text>
                </TouchableOpacity>
                <Navbar currentPage="Cart" />
            </View>
        );
    } else {
        return (
            <View style={mainStyles.container}>
                <Text>Cart Page</Text>
                <Navbar currentPage="Cart" />
            </View>
        );
    }
}
