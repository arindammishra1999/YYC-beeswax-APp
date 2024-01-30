import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";

import { colors } from "@/consts/styles";
import { navbarStyles } from "@/styles/components/navbarStyles";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.yellow,
                tabBarInactiveTintColor: "black",
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="HomePage"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            name="home"
                            style={navbarStyles.optionIcon}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="CartPage"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            name="shopping-cart"
                            style={navbarStyles.optionIcon}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="MorePage"
                options={{
                    title: "More",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            name="layers"
                            style={navbarStyles.optionIcon}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ProfilePage"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            name="account-circle"
                            style={navbarStyles.optionIcon}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
