import React, { useState, useEffect } from "react";
import { View } from "react-native";

import AdminCardHeader from "@/components/adminCardHeader";
import AdminLineChart, {
    LoadingAdmnLineChart,
} from "@/components/adminLineChart";
import { generateChartData } from "@/functions/AnalyticFunctions";
import { filterOrders } from "@/functions/TimeFilter";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminSalesCard(orders: any) {
    const [orderPeriod, setOrderPeriod] = useState(new Date(0));
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});

    const changeTimePeriod = (period: Date) => {
        setOrderPeriod(period);
    };

    useEffect(() => {
        if (orders && orders.orders.length > 0) {
            const setOrders = async () => {
                const trialData = await generateChartData(
                    filterOrders(orders, orderPeriod, new Date()),
                    orderPeriod,
                    new Date(),
                );
                setData(trialData);
                setLoading(false);
            };
            setOrders();
        }
    }, [orders, orderPeriod]);

    if (loading) {
        return (
            <View style={adminDashboardPageStyles.cardContainer}>
                <AdminCardHeader
                    title="Sales"
                    changeTimePeriod={changeTimePeriod}
                />
                <LoadingAdmnLineChart />
            </View>
        );
    } else {
        return (
            <View style={adminDashboardPageStyles.cardContainer}>
                <AdminCardHeader
                    title="Sales"
                    changeTimePeriod={changeTimePeriod}
                />
                <AdminLineChart data={data} />
            </View>
        );
    }
}
