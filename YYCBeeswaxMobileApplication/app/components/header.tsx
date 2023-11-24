import React from 'react';
import { styles } from '../styles/headerStyles';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header(props:{ header: string }) {

    return (
        <View style={styles.header}>
            <Icon
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