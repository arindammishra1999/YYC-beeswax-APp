import React from "react";
import { View, Text } from "react-native";

import AdminOverviewSection from "./adminOverviewSection";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminOverviewCard() {
    return (
        <View style={adminDashboardPageStyles.cardContainer}>
            <AdminOverviewSection
                title="Customers"
                figure="1234"
                change="44.4%"
                isNegative={false}
            />
            <AdminOverviewSection
                title="Total Sales"
                figure="101k"
                change="12.4%"
                isNegative
            />
        </View>
    );
}
