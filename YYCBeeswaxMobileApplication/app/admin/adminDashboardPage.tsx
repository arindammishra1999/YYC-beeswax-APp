import React from "react";
import { ScrollView, View, Text } from "react-native";

import Button from "@/components/button";
import AdminOverviewCard from "@/components/cards/adminOverviewCard";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function AdminDashboardPage() {
    return (
        <ScrollView
            style={[mainStyles.container, adminDashboardPageStyles.page]}
        >
            <View style={adminDashboardPageStyles.header}>
                <Text style={adminDashboardPageStyles.headerTitle}>
                    Dashboard
                </Text>
                <Button
                    title="Sign Out"
                    style={adminDashboardPageStyles.button}
                />
            </View>
            <AdminOverviewCard />
        </ScrollView>
    );
}
