import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";

import Header from "@/components/header";
import { orderHistoryPageStyles } from "@/styles/orderHistoryPageStyles";

export default function OrderHistoryPage() {
    const [orderHistory] = useState(false);

    enum orderStatus {
        Placed = "Placed",
        Shipped = "Shipped",
        Delivered = "Delivered",
        Cancelled = "Cancelled",
    }

    const listings = [
        {
            id: 1,
            title: "Chakra Treasure Beeswax Pillar Candle",
            numberProducts: 2,
            order: orderStatus.Shipped,
            date: "Feb 12, 2023",
            imageLink: require("../../assets/tempImages/chakra.jpg"),
        },
        {
            id: 2,
            title: "Mini Self Care Kit",
            numberProducts: 1,
            order: orderStatus.Delivered,
            date: "Jan 20, 2023",
            imageLink: require("../../assets/tempImages/miniSelfCare.jpg"),
        },
        {
            id: 3,
            title: "Online Rolled Candle Making Starter Kit",
            numberProducts: 2,
            order: orderStatus.Delivered,
            date: "Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 4,
            title: "Extra - Placed",
            numberProducts: 2,
            order: orderStatus.Placed,
            date: "Jan 5, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 5,
            title: "Extra - Shipped",
            numberProducts: 1,
            order: orderStatus.Shipped,
            date: "Jan 6, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 6,
            title: "Extra - Delivered",
            numberProducts: 2,
            order: orderStatus.Delivered,
            date: "Jan 7, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 7,
            title: "Extra - Cancelled",
            numberProducts: 5,
            order: orderStatus.Cancelled,
            date: "Jan 8, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 8,
            title: "Extra",
            numberProducts: 2,
            order: orderStatus.Cancelled,
            date: "Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
    ];

    type ItemProps = {
        title: string;
        numberProducts: number;
        order: orderStatus;
        date: string;
        imageLink: string;
    };

    const Item = ({
        title,
        numberProducts,
        order,
        date,
        imageLink,
    }: ItemProps) => (
        <View style={orderHistoryPageStyles.orderCard}>
            <Image
                style={orderHistoryPageStyles.image}
                source={imageLink as any}
            />
            <View style={orderHistoryPageStyles.detailsContainer}>
                <Text
                    style={orderHistoryPageStyles.orderName}
                    numberOfLines={1}
                >
                    {title}
                </Text>
                <View style={orderHistoryPageStyles.orderDetails}>
                    <Text
                        style={
                            order == orderStatus.Delivered
                                ? orderHistoryPageStyles.orderDetailsDelivered
                                : order == orderStatus.Shipped
                                  ? orderHistoryPageStyles.orderDetailsShipped
                                  : order == orderStatus.Placed
                                    ? orderHistoryPageStyles.orderDetailsPlaced
                                    : orderHistoryPageStyles.orderDetailsCancelled
                        }
                    >
                        {numberProducts} product{numberProducts > 1 ? "s" : ""}{" "}
                        -{" "}
                    </Text>
                    <Text
                        style={
                            order == orderStatus.Delivered
                                ? orderHistoryPageStyles.orderDetailsDelivered
                                : order == orderStatus.Shipped
                                  ? orderHistoryPageStyles.orderDetailsShipped
                                  : order == orderStatus.Placed
                                    ? orderHistoryPageStyles.orderDetailsPlaced
                                    : orderHistoryPageStyles.orderDetailsCancelled
                        }
                    >
                        {order} on {date}
                    </Text>
                </View>
            </View>
        </View>
    );

    if (orderHistory) {
        return (
            <View style={orderHistoryPageStyles.container}>
                <Header header="Order History" />
                <FlatList
                    data={listings}
                    renderItem={({ item }) => (
                        <Item
                            title={item.title}
                            numberProducts={item.numberProducts}
                            order={item.order}
                            date={item.date}
                            imageLink={item.imageLink}
                        />
                    )}
                    keyExtractor={(listings) => listings.id.toString()}
                />
            </View>
        );
    } else {
        return (
            <View style={orderHistoryPageStyles.container}>
                <Header header="Order History" />
                <Text style={orderHistoryPageStyles.messageText}>
                    You haven't ordered anything yet! Go ahead and check out our
                    products.
                </Text>
                <Image
                    resizeMode="contain"
                    source={require("../../assets/shopping.gif")}
                    style={orderHistoryPageStyles.gif}
                />
                <TouchableOpacity
                    style={orderHistoryPageStyles.button}
                    onPress={() => router.replace("./HomePage")}
                >
                    <Text style={orderHistoryPageStyles.buttonText}>
                        Shop Now
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
