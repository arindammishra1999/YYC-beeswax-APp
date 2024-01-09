import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import { headerStyles } from "@/styles/components/headerStyles";

type Props = {
    header: string;
    noBackArrow?: boolean;
};
export default function Header(props: Props) {
    return (
        <View style={headerStyles.header}>
            {!props?.noBackArrow && (
                <Ionicons
                    name="arrow-back"
                    onPress={router.back}
                    size={32}
                    style={headerStyles.backButton}
                />
            )}
            <Text style={headerStyles.headerText}>{props.header}</Text>
        </View>
    );
}
