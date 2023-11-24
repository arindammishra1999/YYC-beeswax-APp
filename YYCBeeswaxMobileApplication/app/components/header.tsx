import React from 'react';
import { headerStyles } from '../styles/headerStyles';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header(props:{ header: string }) {

    return (
        <View style={headerStyles.header}>
            <Icon
                    name="ios-chevron-back" 
                    size={24} 
                    color="black" 
                    style={headerStyles.backButton} 
                />
            <View>
                <Text style={headerStyles.headerText}>{props.header}</Text>
            </View>

        </View>
    );
}