import React from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

export default function Header(props: { header: string }) {
    return (
        <View style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
        }}>
            < Ionicons name='arrow-back' onPress={router.back} size={32} style={{position: 'absolute', left: 10}}/>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{props.header}</Text>
        </View>
    );
}