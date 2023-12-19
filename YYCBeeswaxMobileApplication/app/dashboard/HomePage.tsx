import React from "react";
import { Text, View } from "react-native";

import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";

export default function HomePage() {
    return (
        <View style={mainStyles.container}>
            <Text>Home Page</Text>
            <Navbar currentPage="Home" />
        </View>
    );
}
