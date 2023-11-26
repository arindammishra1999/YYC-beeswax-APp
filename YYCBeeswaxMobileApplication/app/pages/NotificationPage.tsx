import React, {useState} from 'react';
import { headerStyles } from '../styles/headerStyles';
import { notificationPageStyles } from '../styles/notificationPageStyles';
import { Switch, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { default as Navbar } from '../components/navbar';
import { default as Header } from '../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { mainStyles } from '../styles/mainStyles';


export default function NotificationsPage() {
    const [individualSettings, setSetting] = useState([
        {name: 'General Notifications', key: '1'},
        {name: 'Sounds', key: '2'},
        {name: 'Vibration', key: '3'},
        {name: 'Promotions', key: '4'},
        {name: 'Discounts', key: '5'},

    ])

    return (
        <View style={mainStyles.container}>
            <Header header= 'Notifications'/>
            { individualSettings.map((item) => (
                    <View style={notificationPageStyles.item} key={item.key}>
                        <Text style={notificationPageStyles.itemTitle}>{item.name}</Text>
                        <Switch style ={notificationPageStyles.itemToggle}/>
                    </View>
            ))}
            <Navbar/>
        </View>
    )
}


