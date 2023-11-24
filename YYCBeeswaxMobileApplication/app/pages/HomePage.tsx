import { Text, View } from 'react-native';
import { mainStyles } from '../styles/mainStyles';
import React from 'react';

export default function HomePage() {
    return (
        <View style={mainStyles.container}>
            <Text>Home Page</Text>
        </View>
    );
}