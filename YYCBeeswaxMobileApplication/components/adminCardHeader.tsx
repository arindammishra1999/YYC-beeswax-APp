import React, { useState } from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import { viewportWidth } from "@/consts/viewport";
import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

type Props = {
    title: string;
};

export default function AdminCardHeader(props: Props) {
    const options = [
        { key: "1", value: "All Time" },
        { key: "2", value: "Today" },
        { key: "3", value: "Last Week" },
        { key: "4", value: "Last Month" },
        { key: "5", value: "Last 3 Months" },
        { key: "6", value: "Last 6 Months" },
        { key: "7", value: "Last 12 Months" },
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selected, setSelected] = useState("");

    return (
        <View style={adminDashboardPageStyles.headerContainer}>
            <Text style={adminDashboardPageStyles.headerTitle}>
                {props.title}
            </Text>
            <SelectList
                data={options}
                boxStyles={{ width: viewportWidth * 0.35 }}
                dropdownStyles={adminDashboardPageStyles.dropdown}
                setSelected={setSelected}
                defaultOption={{ key: "1", value: "All Time" }}
                search={false}
                save="value"
            />
        </View>
    );
}
