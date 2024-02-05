import React, { useState } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { buttonStyles } from "@/styles/components/buttonStyles";

type Props = {
    title: string;
};

export default function AdminCardHeader(props: Props) {
    const [selectedValue, setSelectedValue] = useState("option1");

    const placeholder = {
        label: "Select an option...",
        value: null,
        color: "#9EA0A4",
    };
    return (
        <View>
            <Text>Select an option:</Text>
            <RNPickerSelect
                placeholder={placeholder}
                onValueChange={(value) => setSelectedValue(value)}
                items={[
                    { label: "Option 1", value: "option1" },
                    { label: "Option 2", value: "option2" },
                    { label: "Option 3", value: "option3" },
                ]}
            />
            <Text>Selected value: {selectedValue}</Text>
        </View>
    );
}
