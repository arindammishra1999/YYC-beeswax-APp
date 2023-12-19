import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { headerStyles } from "@/styles/components/headerStyles";

type Props = {
    header: string;
    onPress: () => void;
};

export default function WarningHeader(props: Props) {
    return (
        <View style={headerStyles.header}>
            <Ionicons
                name="arrow-back"
                onPress={props.onPress}
                size={32}
                style={headerStyles.backButton}
            />
            <Text style={headerStyles.headerText}>{props.header}</Text>
        </View>
    );
}
