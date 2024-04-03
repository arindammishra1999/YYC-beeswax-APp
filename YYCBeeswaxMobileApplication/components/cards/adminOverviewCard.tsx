import React, { useState, useEffect } from "react";
import { View } from "react-native";

import AdminCardHeader from "@/components/adminCardHeader";
import AdminOverviewSection, {
    LoadingAdminOverviewSection,
} from "@/components/cards/adminOverviewSection";
import { calculateOverview } from "@/functions/AnalyticFunctions";
import { filterOrders } from "@/functions/TimeFilter";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminOverviewCard(orders: any) {
    const [orderPeriod, setOrderPeriod] = useState(new Date(0));
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});

    const changeTimePeriod = (period: Date) => {
        setOrderPeriod(period);
    };

    useEffect(() => {
        if (orders && orders.orders.length > 0) {
            const setOrders = async () => {
                const newData = calculateOverview(
                    filterOrders(orders, orderPeriod, new Date()),
                );
                setData(newData);
                setLoading(false);
            };
            setOrders();
        }
    }, [orders, orderPeriod]);

    if (loading) {
        return (
            <View style={adminDashboardPageStyles.cardContainer}>
                <AdminCardHeader
                    title="Overview"
                    changeTimePeriod={changeTimePeriod}
                />
                <LoadingAdminOverviewSection title="Customers" />
                <LoadingAdminOverviewSection title="Total Sales" />
                <LoadingAdminOverviewSection title="Average Order Value" />
                <LoadingAdminOverviewSection title="Total Orders" />
            </View>
        );
    } else {
        return (
            <View style={adminDashboardPageStyles.cardContainer}>
                <AdminCardHeader
                    title="Overview"
                    changeTimePeriod={changeTimePeriod}
                />

                <AdminOverviewSection
                    title="Customers"
                    figure={data.totalCustomers.toFixed(0)}
                    change="44.4%"
                    isNegative={false}
                />
                <AdminOverviewSection
                    title="Total Sales"
                    figure={
                        "$ " +
                        data.totalSales.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })
                    }
                    change="12.4%"
                    isNegative
                />
                <AdminOverviewSection
                    title="Average Order Value"
                    figure={"$ " + data.averageOrderValue.toFixed(2)}
                    change="32.4%"
                    isNegative
                />
                <AdminOverviewSection
                    title="Total Orders"
                    figure={data.totalOrders.toString()}
                    change="20.4%"
                    isNegative={false}
                />
            </View>
        );
    }
}
