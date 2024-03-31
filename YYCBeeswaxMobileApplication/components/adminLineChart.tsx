import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { colors } from "@/consts/styles";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminLineChart(orders: any) {
    const line = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 200, 43],
                strokeWidth: 2, // optional
            },
        ],
    };
    return (
        <View style={adminDashboardPageStyles.graphContainer}>
            <LineChart
                data={line}
                width={330}
                height={220}
                yAxisLabel="$"
                chartConfig={{
                    backgroundColor: colors.white,
                    backgroundGradientFrom: colors.white,
                    backgroundGradientTo: colors.white,
                    decimalPlaces: 0,
                    color: () => colors.blue,
                    style: {
                        borderRadius: 16,
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
}
