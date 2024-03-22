import React from "react";
import { View } from "react-native";

import AdminCardHeader from "@/components/adminCardHeader";
import AdminLineChart from "@/components/adminLineChart";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminSalesCard(orders: any) {
    return (
        <View style={adminDashboardPageStyles.cardContainer}>
            <AdminCardHeader title="Sales" />
            <AdminLineChart />
        </View>
    );
}
