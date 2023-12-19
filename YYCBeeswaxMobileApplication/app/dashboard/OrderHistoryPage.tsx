import React from "react";
import { FlatList, Text, View, Image } from "react-native";
import { orderHistoryPageStyles } from "@/styles/orderHistoryPageStyles";
import Header from "@/components/header";

export default function OrderHistoryPage() {
    const listings = [
        {
            id: 1,
            title: "Chakra Treasure Beeswax Pillar Candle",
            numberProducts: 2,
            orderStatus: "Shipped on Feb 12, 2023",
            imageLink: require("../../assets/tempImages/chakra.jpg"),
        },
        {
            id: 2,
            title: "Mini Self Care Kit",
            numberProducts: 1,
            orderStatus: "Delivered on Jan 20, 2023",
            imageLink: require("../../assets/tempImages/miniSelfCare.jpg"),
        },
        {
            id: 3,
            title: "Online Rolled Candle Making Starter Kit",
            numberProducts: 2,
            orderStatus: "Delivered on Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 4,
            title: "Extra - 4",
            numberProducts: 2,
            orderStatus: "Shipped on Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 5,
            title: "Extra - 5",
            numberProducts: 2,
            orderStatus: "Delivered on Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 6,
            title: "Extra - 6",
            numberProducts: 2,
            orderStatus: "Delivered on Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 7,
            title: "Extra - 7",
            numberProducts: 2,
            orderStatus: "Delivered on Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
        {
            id: 8,
            title: "Extra - 8",
            numberProducts: 2,
            orderStatus: "Delivered on Jan 4, 2023",
            imageLink: require("../../assets/tempImages/onlineRolled.jpg"),
        },
    ];
    type ItemProps = {title: string, numberProducts: number, orderStatus: string, imageLink: string}

    const Item = ({title, numberProducts, orderStatus, imageLink}: ItemProps) => (
        <View style={orderHistoryPageStyles.orderCard}>
            <Image style={orderHistoryPageStyles.image} source={imageLink as any} />
            <View style={orderHistoryPageStyles.detailsContainer}>
                <Text style={orderHistoryPageStyles.orderName} numberOfLines={1}>{title}</Text>
                <View style={orderHistoryPageStyles.orderDetails}>
                    <Text style={orderStatus[0] == 'D' ? 
                                    orderHistoryPageStyles.orderDetailsDelivered : 
                                    orderHistoryPageStyles.orderDetailsShipped}>
                                        {numberProducts} product{numberProducts>1 ? "s" : ""} - </Text>
                    <Text style={orderStatus[0] == 'D' ? 
                                    orderHistoryPageStyles.orderDetailsDelivered : 
                                    orderHistoryPageStyles.orderDetailsShipped}>{orderStatus}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={orderHistoryPageStyles.container}>
            <Header header="Order History"/>
            <FlatList 
                data={listings}
                renderItem={({item}) => <Item title={item.title} 
                                                numberProducts={item.numberProducts} 
                                                orderStatus={item.orderStatus} 
                                                imageLink={item.imageLink}/>}
                keyExtractor={(listings) => listings.id.toString()}
            />
        </View>
    );
}
