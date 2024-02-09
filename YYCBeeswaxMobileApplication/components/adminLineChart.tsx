import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminLineChart() {
    const line = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
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
                yAxisLabel={"$"}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
