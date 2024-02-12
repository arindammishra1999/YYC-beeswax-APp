import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";

import { colors } from "@/consts/styles";
import { navbarStyles } from "@/styles/components/navbarStyles";

export default function Layout() {
    return (
        <Tabs
            safeAreaInsets={{ bottom: 0 }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.yellow,
                tabBarInactiveTintColor: "black",
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: "7%",
                    backgroundColor: colors.white,
                    position: "absolute",
                    bottom: "0%",
                },
            }}
        >
            <Tabs.Screen
                name="AdminDashboardPage"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            name="dashboard"
                            style={navbarStyles.optionIcon}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="DiscountPage"
                options={{
                    title: "Discount",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons
                            name="money-off"
                            style={navbarStyles.optionIcon}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
