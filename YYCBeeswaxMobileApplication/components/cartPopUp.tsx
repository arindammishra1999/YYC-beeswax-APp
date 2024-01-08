import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { rootPageStyles } from "@/styles/rootPageStyles";
import { cartPopUpStyles } from "@/styles/components/cartPopUpStyles";
import LinkButton from "./linkButton";

export default function CartPopUp() {
    return (
        <View style={cartPopUpStyles.container}>
            <View>
                <Text style={cartPopUpStyles.header}>Success!</Text>
                <Text>This item has been added to your cart!</Text>
            </View>

            <View style={rootPageStyles.buttonGroup}>
                <LinkButton
                    title="Keep Shopping"
                    href="/dashboard/HomePage"
                    style={rootPageStyles.button}
                />
                <LinkButton
                    title="Checkout"
                    href="/dashboard/CartPage"
                    style={rootPageStyles.button}
                />
            </View>
        </View>
    );
}
