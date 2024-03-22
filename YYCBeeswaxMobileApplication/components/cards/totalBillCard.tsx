import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

import Skeleton from "../skeleton";

import { totalBillCardStyles } from "@/styles/components/totalBillCardStyles";

interface TotalBillCardProps {
    totalItemsCost: number;
    shippingCost: number;
    gstCost: number;
    totalBill: number;
    taxProvince: string;
    discountAmount?: number;
    discountType?: boolean;
}

const TotalBillCard: React.FC<TotalBillCardProps> = ({
    totalItemsCost,
    shippingCost,
    gstCost,
    totalBill,
    taxProvince,
    discountAmount,
    discountType,
}) => {
    const taxInformation: Record<string, string> = {
        Alberta: "GST (5%)",
        "British Columbia": "PST (7%) + GST (5%)",
        Saskatchewan: "PST (6%) + GST (5%)",
        Manitoba: "PST (7%) + GST (5%)",
        Ontario: "HST (13%)",
        Quebec: "QST (9.975%) + GST (5%)",
        "New Brunswick": "HST (15%)",
        "Newfoundland and Labrador": "HST (15%)",
        "Prince Edward Island": "HST (15%)",
        "Nova Scotia": "HST (15%)",
    };
    const { t } = useTranslation();
    return (
        <View>
            <View style={totalBillCardStyles.labelContainer}>
                {discountAmount ? (
                    <Text style={totalBillCardStyles.label}>
                        {t("Subtotal: (Discount Applied")}:
                        {discountType
                            ? ` ${discountAmount}%`
                            : ` $${discountAmount}`}
                        {t(")")}
                    </Text>
                ) : (
                    <Text style={totalBillCardStyles.label}>
                        {t("Subtotal")}:
                    </Text>
                )}
                <Text style={totalBillCardStyles.value}>
                    ${(Math.round(totalItemsCost * 100) / 100).toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>
                    {t("Shipping Fee:")}
                </Text>
                <Text style={totalBillCardStyles.value}>
                    ${shippingCost.toFixed(2)}
                </Text>
            </View>

            <View style={totalBillCardStyles.labelContainer}>
                <Text style={totalBillCardStyles.label}>
                    {t("Taxes")}:{" "}
                    {taxInformation[taxProvince] ||
                        t("Tax is based on Shipping Information")}
                </Text>
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

export function LoadingTotalBillCard() {
    return (
        <View>
            <View style={totalBillCardStyles.labelContainer}>
                <Skeleton
                    width="100%"
                    height={21}
                    style={{ marginVertical: 4 }}
                />
            </View>
            <View style={totalBillCardStyles.labelContainer}>
                <Skeleton
                    width="100%"
                    height={21}
                    style={{ marginVertical: 4 }}
                />
            </View>
            <View style={totalBillCardStyles.labelContainer}>
                <Skeleton
                    width="100%"
                    height={21}
                    style={{ marginVertical: 4 }}
                />
            </View>
            <View style={totalBillCardStyles.horizontalLine} />
            <View style={totalBillCardStyles.labelContainer}>
                <Skeleton
                    width="100%"
                    height={21}
                    style={{ marginVertical: 4 }}
                />
            </View>
        </View>
    );
}
