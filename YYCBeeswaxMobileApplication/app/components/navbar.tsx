import React from 'react';
import { styles } from '../styles/headerStyles';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Navbar(props:{ header: string }) {

    return (
        <View style={styles.header}>
            <Ionicons 
                    name="ios-chevron-back" 
                    size={24} 
                    color="black" 
                    style={styles.backButton} 
                />
            <View>
                <Text style={styles.headerText}>{props.header}</Text>
            </View>

        </View>
    );
}