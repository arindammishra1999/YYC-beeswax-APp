import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/consts/styles';
import {CART_ROUTE, HOMEPAGE_ROUTE, MORE_ROUTE, PROFILE_ROUTE} from '@/consts/constants';
import HomePage from '@/app/dashboard/homePage';
import CartPage from '@/app/dashboard/cartPage';
import ProfilePage from '@/app/dashboard/profilePage';
import MorePage from '@/app/dashboard/morePage';

const Tab = createBottomTabNavigator();


export default function Navbar() {
    return (
        <Tab.Navigator
            initialRouteName={HOMEPAGE_ROUTE}
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    let iconName = '';
                    if (route.name === HOMEPAGE_ROUTE) {
                        iconName = 'home';
                    } else if (route.name === CART_ROUTE) {
                        iconName = 'shopping-cart';
                    } else if (route.name === MORE_ROUTE) {
                        iconName = 'layers';
                    } else if (route.name === PROFILE_ROUTE) {
                        iconName = 'account-circle';
                    }
                    return <Icon name={iconName} color={color} size={38}/>;
                },
                tabBarActiveTintColor: colors.yellow,
                tabBarInactiveTintColor: colors.black,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {height: '9%'},
            })}>
            <Tab.Screen name={HOMEPAGE_ROUTE} component={HomePage}/>
            <Tab.Screen name={CART_ROUTE} component={CartPage}/>
            <Tab.Screen name={MORE_ROUTE} component={MorePage}/>
            <Tab.Screen name={PROFILE_ROUTE} component={ProfilePage}/>
        </Tab.Navigator>
    );
}