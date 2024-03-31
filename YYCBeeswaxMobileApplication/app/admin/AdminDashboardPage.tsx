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
        getOrderData();
    }, []);

    const getOrderData = () => {
        getAllOrders().then((orders) => {
            if (orders) {
                orders.sort(
                    (one, two) => one.data.date.seconds - two.data.date.seconds,
                );
                setOrders(orders);
            } else {
                console.log("Issue getting events");
            }
        });
    };

    return (
        <View style={mainStyles.container}>
            <AdminHeader header="Dashboard" />
            <ScrollView style={adminDashboardPageStyles.page}>
                <AdminOverviewCard orders={orders} />
                <AdminSalesCard orders={orders} />
                <AdminPopularProductsCard orders={orders} />
            </ScrollView>
        </View>
    );
}
