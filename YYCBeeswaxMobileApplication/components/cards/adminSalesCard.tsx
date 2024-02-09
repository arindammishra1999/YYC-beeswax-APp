import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import AdminCardHeader from "@/components/adminCardHeader";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminSalesCard() {
    return (
        <View style={adminDashboardPageStyles.cardContainer}>
            <AdminCardHeader title="Sales" />
        </View>
    );
}
