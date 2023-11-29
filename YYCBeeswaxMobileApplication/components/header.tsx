import React from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import {headerStyles} from "@/styles/components/headerStyles";

export default function Header(props: { header: string }) {
    return (
        <View style={headerStyles.header}>
            <Ionicons name='arrow-back' onPress={router.back} size={32} style={headerStyles.backButton}/>
            <Text style={headerStyles.headerText}>{props.header}</Text>
        </View>
    );
}