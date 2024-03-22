import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import AdminHeader from "@/components/adminHeader";
import AdminOverviewCard from "@/components/cards/adminOverviewCard";
import AdminPopularProductsCard from "@/components/cards/adminPopularProducts";
import AdminSalesCard from "@/components/cards/adminSalesCard";
import { getAllOrders } from "@/firebase/getCollections/getAllOrders";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";
import { mainStyles } from "@/styles/mainStyles";

export default function AdminDashboardPage() {
    const [orders, setOrders] = useState([] as any);
    useEffect(() => {
        getAllOrders().then((orders) => {
            setOrders(orders);
        });
    }, []);
    return (
        <View style={mainStyles.container}>
            <AdminHeader header="Dashboard" />
            <ScrollView style={adminDashboardPageStyles.page}>
                <AdminOverviewCard orders />
                <AdminSalesCard orders />
                <AdminPopularProductsCard orders />
            </ScrollView>
        </View>
    );
}
