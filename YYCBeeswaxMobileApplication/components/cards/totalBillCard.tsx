import React from "react";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    return (
        <View>
            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>{t("Subtotal")}</Text>
                <Text style={totalBillCardStyles.value}>
                    ${(Math.round(totalItemsCost * 100) / 100).toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>
                    {t("Shipping Fee")}
                </Text>
                <Text style={totalBillCardStyles.value}>
                    ${shippingCost.toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>{t("GST")}</Text>
                <Text style={totalBillCardStyles.value}>
                    ${gstCost.toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.horizontalLine} />

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.totalLabel}>{t("Total")}</Text>
                <Text style={totalBillCardStyles.totalValue}>
                    ${(Math.round(totalBill * 100) / 100).toFixed(2)}
                </Text>
            </View>
        </View>
    );
};

export default TotalBillCard;
