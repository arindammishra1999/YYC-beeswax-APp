import { Image } from "expo-image";
import { router } from "expo-router";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { db } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";
import { orderHistoryPageStyles } from "@/styles/orderHistoryPageStyles";

export default function OrderHistoryPage() {
    const { t } = useTranslation();
    const { user } = useUser();
    const [orderHistory, setOrderHistory] = useState<DocumentData[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchOrderHistory();
        setRefreshing(false);
    };

    const fetchOrderHistory = async () => {
        if (user) {
            const userOrdersRef = collection(db, `users/${user.uid}/orders`);
            const ordersSnapshot = await getDocs(userOrdersRef);
            const ordersData = ordersSnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data(),
                };
            });
            setOrderHistory(ordersData);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderHistory();
    }, [user]);

    const renderOrder = (order: any) => (
        <TouchableOpacity
            onPress={() => {
                router.push(`/orders/${order.id}/`);
            }}
        >
            <View style={orderHistoryPageStyles.orderCard}>
                <Image
                    style={orderHistoryPageStyles.image}
                    source={{ uri: order.data.products[0].imageUrl }}
                />
                <View style={orderHistoryPageStyles.detailsContainer}>
                    <Text
                        style={orderHistoryPageStyles.orderName}
                        numberOfLines={1}
                    >
                        {t(order.data.products[0].name)}{" "}
                    </Text>
                    <View style={orderHistoryPageStyles.orderDetails}>
                        <Text>
                            {order.data.products.length} {t("product")}
                            {order.data.products.length > 1 ? "s" : ""}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={mainStyles.spinnerOverlay}>
                <ActivityIndicator size="large" color={colors.yellow} />
            </View>
        );
    } else if (orderHistory.length > 0) {
        return (
            <View style={orderHistoryPageStyles.container}>
                <Header header={t("Order History")} />
                <ScrollView
                    contentContainerStyle={
                        orderHistoryPageStyles.scrollViewContainer
                    }
                >
                    {orderHistory.map((order, index) => (
                        <React.Fragment key={index}>
                            {renderOrder(order)}
                        </React.Fragment>
                    ))}
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.yellow}
                    />
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View style={orderHistoryPageStyles.container}>
                <Header header={t("Order History")} />
                <Text style={orderHistoryPageStyles.messageText}>
                    You haven't ordered anything yet! Go ahead and check out our
                    products.
                </Text>
                <Image
                    contentFit="contain"
                    source={require("@/assets/shopping.gif")}
                    style={orderHistoryPageStyles.gif}
                />
                <TouchableOpacity
                    style={orderHistoryPageStyles.button}
                    onPress={() => router.push("/dashboard/HomePage")}
                >
                    <Text style={orderHistoryPageStyles.buttonText}>
                        Shop Now
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
