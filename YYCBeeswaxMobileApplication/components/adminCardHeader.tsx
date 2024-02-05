import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { adminDashboardPageStyles } from "@/styles/adminDashboardPageStyles";

type Props = {
    title: string;
};

export default function AdminCardHeader(props: Props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Select Item");
    const [items, setItems] = useState([
        { label: "Last Day", value: "Last Day" },
        { label: "Last Week", value: "Last Week" },
        { label: "Last Month", value: "Last Month" },
        { label: "Last 3 Months", value: "Last 3 Months" },
        { label: "Last 6 Months", value: "Last 6 Months" },
        { label: "Last 12 Months", value: "Last 12 Months" },
        { label: "All Time", value: "All Time" },
    ]);

    return (
        <View style={adminDashboardPageStyles.headerContainer}>
            <Text style={adminDashboardPageStyles.headerTitle}>
                {props.title}
            </Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={adminDashboardPageStyles.dropdown}
                dropDownContainerStyle={adminDashboardPageStyles.dropdown}
            />
        </View>
    );
}
