import React from "react";
import { Text, View } from "react-native";

import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";

export default function CartPage() {
    return (
        <View style={mainStyles.container}>
            <Text>Cart Page</Text>
            <Navbar currentPage="Cart" />
        </View>
    );
}
