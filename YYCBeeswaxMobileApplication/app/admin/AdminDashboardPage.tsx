import React from "react";
import { ScrollView, View } from "react-native";

import AdminHeader from "@/components/adminHeader";
import AdminOverviewCard from "@/components/cards/adminOverviewCard";
import AdminPopularProductsCard from "@/components/cards/adminPopularProducts";
import AdminSalesCard from "@/components/cards/adminSalesCard";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function AdminDashboardPage() {
    return (
        <View style={mainStyles.container}>
            <AdminHeader header="Dashboard" />
            <ScrollView style={adminDashboardPageStyles.page}>
                <AdminOverviewCard />
                <AdminSalesCard />
                <AdminPopularProductsCard />
            </ScrollView>
        </View>
    );
}
