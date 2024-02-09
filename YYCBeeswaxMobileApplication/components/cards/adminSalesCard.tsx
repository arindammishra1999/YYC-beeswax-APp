import React from "react";
import { View } from "react-native";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts";
import AdminCardHeader from "@/components/adminCardHeader";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminSalesCard() {
    const data = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 7 },
        { x: 5, y: 11 },
    ];
    return (
        <View style={adminDashboardPageStyles.cardContainer}>
            <AdminCardHeader title="Sales" />
            <View></View>
        </View>
    );
}
