import React from "react";
import { View } from "react-native";

import OverviewCard from "@/components/cards/overviewCard";
import { mainStyles } from "@/styles/mainStyles";

export default function AdminDashboardPage() {
    return (
        <View style={mainStyles.container}>
            <OverviewCard />
        </View>
    );
}
