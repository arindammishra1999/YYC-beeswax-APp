import { Image } from "expo-image";
import { router } from "expo-router";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, TouchableOpacity, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { db } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";
import { orderHistoryPageStyles } from "@/styles/orderHistoryPageStyles";

export default function OrderHistoryPage() {
    const { t } = useTranslation();
    const { user } = useUser();
    const [orderHistory, setOrderHistory] = useState<DocumentData[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchOrderHistory();
        setRefreshing(false);
    };

    const fetchOrderHistory = async () => {
        if (user) {
            const userOrdersRef = collection(db, `users/${user.uid}/orders`);
            const ordersSnapshot = await getDocs(userOrdersRef);
            const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
            setOrderHistory(ordersData);
        }
    };

    useEffect(() => {
        fetchOrderHistory();
    }, [user]);

    const renderOrder = (order: DocumentData) => (
        <TouchableOpacity onPress={() => {}}>
            <View style={orderHistoryPageStyles.orderCard}>
                <Image
                    style={orderHistoryPageStyles.image}
                    source={{ uri: order.products[0].imageUrl }}
                />
                <View style={orderHistoryPageStyles.detailsContainer}>
                    <Text
                        style={orderHistoryPageStyles.orderName}
                        numberOfLines={1}
                    >
                        {t(order.products[0].name)}
                    </Text>
                    <View style={orderHistoryPageStyles.orderDetails}>
                        <Text>
                            {order.products.length} {t("product")}
                            {order.products.length > 1 ? "s" : ""}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (orderHistory.length > 0) {
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
