import { StyleSheet } from 'react-native';
import Constants from "expo-constants";
import { colors } from '../consts/styles';

export const notificationPageStyles = StyleSheet.create({
    item: {
        paddingTop: 10, 
        paddingBottom: 10,       
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    itemTitle: {
        alignSelf: 'center',
        fontSize: 14,
        marginLeft: 20,
        
    },
    itemToggle: {
        alignSelf: 'flex-end',
        marginRight: 20,      
    },
    header: {
        paddingTop: 20,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    divider: {
        width: "90%",
        display: "flex",
        alignSelf: "center",
        marginTop: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGrey,
    },
    button: {
        backgroundColor: colors.yellow,
        position: 'absolute',
        alignSelf: 'center',
        width: "65%",
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 30,
        bottom: "5%",
    },
    buttonText: {
        fontSize: 21,
        fontWeight: 'bold',
        alignSelf: "center",
    }
});