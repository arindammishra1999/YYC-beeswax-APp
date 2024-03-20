import React from "react";
import { View, Text } from "react-native";

import { totalBillCardStyles } from "@/styles/components/totalBillCardStyles";

interface TotalBillCardProps {
    totalItemsCost: number;
    shippingCost: number;
    gstCost: number;
    totalBill: number;
    discountAmount?: number;
    discountType?: boolean;
}

const TotalBillCard: React.FC<TotalBillCardProps> = ({
    totalItemsCost,
    shippingCost,
    gstCost,
    totalBill,
    discountAmount,
    discountType,
}) => {
    return (
        <View>
            <View style={totalBillCardStyles.labelContainer}>
                {discountAmount ? (
                    <Text style={totalBillCardStyles.label}>
                        Subtotal (Discount Applied:
                        {discountType
                            ? ` ${discountAmount}%`
                            : ` $${discountAmount}`}
                        )
                    </Text>
                ) : (
                    <Text style={totalBillCardStyles.label}>Subtotal</Text>
                )}
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
                <Text style={totalBillCardStyles.label}>Applicable Taxes</Text>
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
        </View>
    );
};

export default TotalBillCard;
