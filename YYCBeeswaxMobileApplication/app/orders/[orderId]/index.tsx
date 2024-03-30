import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "@/components/header";
import { colors } from "@/consts/styles";
import { db } from "@/firebase/config";
import { getUserById } from "@/firebase/getCollections/getUserById";
import { useUser } from "@/firebase/providers/userProvider";
import { mainStyles } from "@/styles/mainStyles";
import { orderDetailsPageStyles } from "@/styles/orderDetailsPageStyles";

export default function App() {
    const { t } = useTranslation();
    const [order, setOrder] = useState<DocumentData | null>(null);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const { orderId } = useLocalSearchParams();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (user && orderId) {
                    const orderRef = doc(
                        db,
                        `users/${user.uid}/orders/${orderId}`,
                    );
                    const orderDoc = await getDoc(orderRef);
                    if (orderDoc.exists()) {
                        setOrder(orderDoc.data());
                    } else {
                        console.error("Order document does not exist");
                    }
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserName = async () => {
            try {
                if (order?.user) {
                    const userDetails = await getUserById(order.user);
                    if (userDetails) {
                        setUserName(userDetails.name);
                    }
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchOrderDetails();
        fetchUserName();
    }, []);

    if (loading) {
        return (
            <View style={mainStyles.spinnerOverlay}>
                <ActivityIndicator size="large" color={colors.yellow} />
            </View>
        );
    }

    if (!order) {
        return (
            <View style={orderDetailsPageStyles.container}>
                <Header header={t("Order Details")} />
                <Text>{t("No order details found.")}</Text>
            </View>
        );
    }

    const renderProductCard = (product: any, index: number) => (
        <View style={orderDetailsPageStyles.productCard} key={index}>
            <Image
                style={orderDetailsPageStyles.image}
                source={{ uri: product.imageUrl }}
            />
            <View style={orderDetailsPageStyles.detailsContainer}>
                <Text
                    style={orderDetailsPageStyles.productName}
                    numberOfLines={1}
                >
                    {t(product.name)}
                </Text>
                <View style={orderDetailsPageStyles.orderDetails}>
                    <Text style={orderDetailsPageStyles.orderDetailsText}>
                        {product.choices &&
                            product.choices.length > 0 &&
                            product.choices.map((choice: any) => {
                                if (choice.title === "Size") {
                                    return `Height - ${choice.name}, `;
                                }
                                if (
                                    product.name ===
                                    "Divine Meditation Gift Set"
                                ) {
                                    return `${choice.title} - ${choice.name},\n`;
                                }
                            })}
                        {t("Quantity : ")} {product.amount}
                    </Text>
                </View>
            </View>
        </View>
    );

    const renderBillingCard = () => {
        const totalProductCost = order.products.reduce(
            (total: number, product: any) => {
                return total + product.amount * product.costPer;
            },
            0,
        );

        let total;
        if (order.discount > 0) {
            if (order.discountType) {
                total =
                    Math.max(
                        0,
                        totalProductCost -
                            totalProductCost * (order.discount / 100),
                    ) +
                    order.taxes +
                    10;
            } else {
                total =
                    Math.max(0, totalProductCost - order.discount) +
                    order.taxes +
                    10;
            }
        } else {
            total = totalProductCost + order.taxes + 10;
        }

        return (
            <View style={orderDetailsPageStyles.billingCard}>
                {order.products.map((product: any, index: number) => (
                    <View style={orderDetailsPageStyles.billingRow} key={index}>
                        <Text
                            style={orderDetailsPageStyles.billingCardText}
                            numberOfLines={1}
                        >
                            {product.amount} x {t(product.name)}:
                        </Text>
                        <Text style={orderDetailsPageStyles.billingCardPrices}>
                            ${(product.amount * product.costPer).toFixed(2)}
                        </Text>
                    </View>
                ))}
                {order.discount > 0 && (
                    <View style={orderDetailsPageStyles.billingRow}>
                        <Text style={orderDetailsPageStyles.billingCardText}>
                            Discount Applied: {order.discountType ? "" : "$"}
                            {order.discount}
                            {order.discountType ? "%" : ""}
                        </Text>
                        <Text style={orderDetailsPageStyles.billingCardPrices}>
                            {order.discountType
                                ? "- $" +
                                  (
                                      totalProductCost *
                                      (order.discount / 100)
                                  ).toFixed(2)
                                : "- $" + parseFloat(order.discount).toFixed(2)}
                        </Text>
                    </View>
                )}
                <View style={orderDetailsPageStyles.billingRow}>
                    <Text style={orderDetailsPageStyles.billingCardText}>
                        Shipping:
                    </Text>
                    <Text style={orderDetailsPageStyles.billingCardPrices}>
                        $10.00
                    </Text>
                </View>
                <View style={orderDetailsPageStyles.billingRow}>
                    <Text style={orderDetailsPageStyles.billingCardText}>
                        Taxes: {order.taxString}
                    </Text>
                    <Text style={orderDetailsPageStyles.billingCardPrices}>
                        ${order.taxes.toFixed(2)}
                    </Text>
                </View>
                <View style={orderDetailsPageStyles.dottedLine} />
                <View style={orderDetailsPageStyles.billingRow}>
                    <Text style={orderDetailsPageStyles.billingCardText}>
                        Total:
                    </Text>
                    <Text style={orderDetailsPageStyles.billingCardPrices}>
                        ${(total as number).toFixed(2)}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={orderDetailsPageStyles.container}>
            <Header header={t("Order Details")} />
            <ScrollView>
                <Text style={orderDetailsPageStyles.messageText}>Items</Text>
                {order.products.map((product: any, index: number) =>
                    renderProductCard(product, index),
                )}
                <View style={orderDetailsPageStyles.horizontalLine} />
                <Text style={orderDetailsPageStyles.messageText}>
                    Payment Details
                </Text>
                {renderBillingCard()}
                <View style={orderDetailsPageStyles.horizontalLine} />
                <Text style={orderDetailsPageStyles.orderDateText}>
                    Order Date
                </Text>
                <Text style={orderDetailsPageStyles.dateText}>
                    {new Date(order.date.seconds * 1000).toLocaleDateString(
                        "en-US",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        },
                    )}
                </Text>
                <View style={orderDetailsPageStyles.horizontalLine} />
                <Text style={orderDetailsPageStyles.messageText}>
                    Shipping Info
                </Text>
                <Text style={orderDetailsPageStyles.shippingInfoTitle}>
                    Order Address
                </Text>
                <Text style={orderDetailsPageStyles.shippingInfoText}>
                    {order.shippingInfo}
                </Text>
                <Text style={orderDetailsPageStyles.shippingInfoTitle}>
                    Name
                </Text>
                <Text style={orderDetailsPageStyles.shippingInfoName}>
                    {userName}
                </Text>
            </ScrollView>
        </View>
    );
}
