import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../consts/styles';
import {
    HOMEPAGE_ROUTE,
    CART_ROUTE,
    EXTRAS_ROUTE,
    PROFILE_ROUTE
} from '../consts/constants';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import ProfilePage from '../pages/ProfilePage';
import ExtrasPage from '../pages/ExtrasPage';

const Tab = createBottomTabNavigator();


export default function Navbar(){
    return (
        <Tab.Navigator
            initialRouteName={HOMEPAGE_ROUTE}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = '';
                    if (route.name === HOMEPAGE_ROUTE) {
                        iconName = 'home-outline';
                    } else if (route.name === CART_ROUTE) {
                        iconName = 'cart-outline';
                    } else if (route.name === EXTRAS_ROUTE) {
                        iconName = 'person-circle-outline';
                    } else if (route.name === PROFILE_ROUTE) {
                        iconName = 'person-circle-outline';
                    }
                    return <Icon name={iconName} color={color} size={38} />;
                },
                tabBarActiveTintColor: colors.yellow,
                tabBarInactiveTintColor: colors.black,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {height: '9%'},
        })}>
            <Tab.Screen name={HOMEPAGE_ROUTE} component={HomePage}/>
            <Tab.Screen name={CART_ROUTE} component={CartPage}/>
            <Tab.Screen name={EXTRAS_ROUTE} component={ExtrasPage}/>
            <Tab.Screen name={PROFILE_ROUTE} component={ProfilePage}/>
        </Tab.Navigator>
    );
}