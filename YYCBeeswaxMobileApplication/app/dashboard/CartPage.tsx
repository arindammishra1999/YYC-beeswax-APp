import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";

import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { cartPageStyles } from "@/styles/cartPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function CartPage() {
    const [emptyCart] = useState(true);

    if (emptyCart) {
        return (
            <View style={cartPageStyles.container}>
                <Header header="Your Cart" noBackArrow />
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
