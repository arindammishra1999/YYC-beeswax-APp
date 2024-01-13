import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Navbar from "@/components/navbar";
import { mainStyles } from "@/styles/mainStyles";
import { router } from "expo-router";

export default function MorePage() {
    return (
        <View style={mainStyles.container}>
            <TouchableOpacity onPress={() => router.push("./EventsPage")}>
                <Text>More Page</Text>
            </TouchableOpacity>

            <Navbar currentPage="More" />
        </View>
    );
}
