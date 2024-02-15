import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { totalBillCardStyles } from "@/styles/components/totalBillCardStyles";

interface TotalBillCardProps {
    totalItemsCost: number;
    shippingCost: number;
    gstCost: number;
    totalBill: number;
}

const TotalBillCard: React.FC<TotalBillCardProps> = ({
    totalItemsCost,
    shippingCost,
    gstCost,
    totalBill,
}) => {
    return (
        <View style={totalBillCardStyles.cardContainer}>
            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>Subtotal</Text>
                <Text style={totalBillCardStyles.value}>
                    ${(Math.round(totalItemsCost * 100) / 100).toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>Shipping Fee</Text>
                <Text style={totalBillCardStyles.value}>
                    ${shippingCost.toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>GST</Text>
                <Text style={totalBillCardStyles.value}>
                    ${gstCost.toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.horizontalLine} />

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.totalLabel}>Total</Text>
                <Text style={totalBillCardStyles.totalValue}>
                    ${(Math.round(totalBill * 100) / 100).toFixed(2)}
                </Text>
            </View>

            <TouchableOpacity style={totalBillCardStyles.button}>
                <Text style={totalBillCardStyles.buttonText}>
                    Continue to shipping
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TotalBillCard;
