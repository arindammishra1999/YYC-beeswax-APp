import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import Skeleton from "@/components/skeleton";
import { colors } from "@/consts/styles";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

export default function AdminLineChart(data: any) {
    return (
        <View style={adminDashboardPageStyles.graphContainer}>
            <LineChart
                data={data.data}
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

export function LoadingAdmnLineChart() {
    return (
        <View style={adminDashboardPageStyles.graphContainer}>
            <Skeleton style={adminDashboardPageStyles.loadingGraph} />
        </View>
    );
}
