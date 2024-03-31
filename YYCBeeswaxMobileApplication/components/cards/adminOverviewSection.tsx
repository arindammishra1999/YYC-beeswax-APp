import React from "react";
import { View, Text } from "react-native";

import Skeleton from "@/components/skeleton";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

type Props = {
    title: string;
    figure: string;
    isNegative: boolean;
    change: string;
};

export default function AdminOverviewSection(props: Props) {
    return (
        <View style={adminDashboardPageStyles.overviewSection}>
            <Text style={adminDashboardPageStyles.overviewText}>
                {props.title}
            </Text>
            <View style={adminDashboardPageStyles.figure}>
                <Text style={adminDashboardPageStyles.figureText}>
                    {props.figure}
                </Text>
                <View>
                    <Text
                        style={[
                            props.isNegative
                                ? adminDashboardPageStyles.changePositive
                                : adminDashboardPageStyles.changeNegative,
                            adminDashboardPageStyles.change,
                        ]}
                    >
                        <Text style={adminDashboardPageStyles.arrow}>
                            {props.isNegative ? "\u2191\u00A0" : "\u2193\u00A0"}
                        </Text>
                        {props.change}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export function LoadingAdminOverviewSection(props: { title: string }) {
    return (
        <View style={adminDashboardPageStyles.overviewSection}>
            <Text style={adminDashboardPageStyles.overviewText}>
                {props.title}
            </Text>
            <Skeleton style={adminDashboardPageStyles.figureLoading} />
        </View>
    );
}
