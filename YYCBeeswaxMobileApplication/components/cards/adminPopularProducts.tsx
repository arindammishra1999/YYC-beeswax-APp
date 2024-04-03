import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import AdminCardHeader from "@/components/adminCardHeader";
import AdminProductCard, {
    LoadingAdminProductCard,
} from "@/components/cards/adminProductCard";
import { calculateBestSellers } from "@/functions/AnalyticFunctions";
import { filterOrders } from "@/functions/TimeFilter";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminPopularProductsCard(orders: any) {
    const [orderPeriod, setOrderPeriod] = useState(new Date(0));
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});

    const changeTimePeriod = (period: Date) => {
        setOrderPeriod(period);
    };

    useEffect(() => {
        if (orders && orders.orders.length > 0) {
            const setOrders = async () => {
                const newData = calculateBestSellers(
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
            <View
                style={[
                    adminDashboardPageStyles.cardContainer,
                    adminDashboardPageStyles.bottom,
                ]}
            >
                <AdminCardHeader
                    title="Popular Products"
                    changeTimePeriod={changeTimePeriod}
                />
                <View style={adminDashboardPageStyles.subTitle}>
                    <Text style={adminDashboardPageStyles.overviewText}>
                        Products
                    </Text>
                    <Text style={adminDashboardPageStyles.overviewText}>
                        Earnings
                    </Text>
                </View>
                <View style={{ zIndex: -1 }}>
                    <LoadingAdminProductCard />
                    <LoadingAdminProductCard />
                    <LoadingAdminProductCard />
                </View>
            </View>
        );
    } else {
        return (
            <View
                style={[
                    adminDashboardPageStyles.cardContainer,
                    adminDashboardPageStyles.bottom,
                ]}
            >
                <AdminCardHeader
                    title="Popular Products"
                    changeTimePeriod={changeTimePeriod}
                />
                <View style={adminDashboardPageStyles.subTitle}>
                    <Text style={adminDashboardPageStyles.overviewText}>
                        Products
                    </Text>
                    <Text style={adminDashboardPageStyles.overviewText}>
                        Earnings
                    </Text>
                </View>
                <View style={{ zIndex: -1 }}>
                    {data.map((product: any, index: number) => (
                        <AdminProductCard
                            key={index}
                            image={product?.url}
                            name={product.name}
                            earnings={product.sales}
                            id={product.id}
                        />
                    ))}
                </View>
                {data.length == 0 && (
                    <View style={{ zIndex: -1 }}>
                        <View style={adminDashboardPageStyles.headerContainer}>
                            <Text style={adminDashboardPageStyles.noOrders}>
                                There were no sales during this time period
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}
