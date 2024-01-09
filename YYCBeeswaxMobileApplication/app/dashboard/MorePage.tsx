import React from "react";
import { Text, View } from "react-native";

import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";

export default function MorePage() {
    return (
        <View style={mainStyles.container}>
            <Text>More Page</Text>
            <Navbar currentPage="More" />
        </View>
    );
}
