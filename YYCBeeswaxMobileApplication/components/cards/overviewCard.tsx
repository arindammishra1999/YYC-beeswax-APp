import React from "react";
import { View, Text } from "react-native";

import { overviewCardStyles } from "@/styles/components/overviewCardStyles";

export default function OverviewCard() {
    return (
        <View style={overviewCardStyles.cardContainer}>
            <Text style={overviewCardStyles.header}>Overview</Text>
        </View>
    );
}
