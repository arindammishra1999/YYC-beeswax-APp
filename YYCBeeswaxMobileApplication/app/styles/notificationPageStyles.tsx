import { StyleSheet } from 'react-native';
import Constants from "expo-constants";
import { colors } from '../consts/styles';

export const notificationPageStyles = StyleSheet.create({
    item: {
        marginTop: 10,
        paddingTop: 10, 
        paddingBottom: 10,       
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        
    },
    itemTitle: {
        alignSelf: 'flex-start',
        paddingTop: 7,
        fontSize: 14,
        height: '100%',
        marginLeft: 10,
        
    },
    itemToggle: {
        alignSelf: 'flex-end',
        marginRight: 10,      
    }
});