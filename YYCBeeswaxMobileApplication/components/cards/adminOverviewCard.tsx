import React from "react";
import { View } from "react-native";

import AdminCardHeader from "@/components/adminCardHeader";
import AdminOverviewSection from "@/components/cards/adminOverviewSection";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminOverviewCard() {
    return (
        <View style={adminDashboardPageStyles.cardContainer}>
            <AdminCardHeader title="Overview" />
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
            <AdminOverviewSection
                title="Average Order Value"
                figure="$ 40.08"
                change="32.4%"
                isNegative
            />
            <AdminOverviewSection
                title="Total Orders"
                figure="500"
                change="20.4%"
                isNegative={false}
            />
        </View>
    );
}
