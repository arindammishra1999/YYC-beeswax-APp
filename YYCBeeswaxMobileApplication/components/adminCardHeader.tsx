import React from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import { fonts } from "@/consts/styles";
import { viewportWidth } from "@/consts/viewport";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

type Props = {
    title: string;
    changeTimePeriod: (period: Date) => void;
};

export default function AdminCardHeader(props: Props) {
    const options = [
        { key: "1", value: "All Time" },
        { key: "2", value: "Today" },
        { key: "3", value: "Last Week" },
        { key: "4", value: "Last Month" },
        { key: "5", value: "Last 3 Months" },
        { key: "6", value: "Last 6 Months" },
        { key: "7", value: "Last Year" },
    ];

    const changeSelectedTimePeriod = (selected: string) => {
        let period: Date;
        const currentDate = new Date();
        const multiplier = 24 * 60 * 60 * 1000;

        switch (selected) {
            case "Today":
                period = currentDate;
                break;
            case "Last Week":
                period = new Date(currentDate.getTime() - 7 * multiplier);
                break;
            case "Last Month":
                period = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 1),
                );
                break;
            case "Last 3 Months":
                period = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 3),
                );
                break;
            case "Last 6 Months":
                period = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 6),
                );
                break;
            case "Last Year":
                period = new Date(
                    currentDate.setFullYear(currentDate.getFullYear() - 1),
                );
                break;
            default:
                period = new Date(0);
        }
        if (props.changeTimePeriod) {
            props.changeTimePeriod(period);
        }
    };
    return (
        <View style={adminDashboardPageStyles.headerContainer}>
            <Text style={adminDashboardPageStyles.headerTitle}>
                {props.title}
            </Text>
            <SelectList
                data={options}
                boxStyles={{ width: viewportWidth * 0.35 }}
                dropdownStyles={adminDashboardPageStyles.dropdown}
                setSelected={changeSelectedTimePeriod}
                defaultOption={{ key: "1", value: "All Time" }}
                search={false}
                save="value"
                fontFamily={fonts.main}
            />
        </View>
    );
}
