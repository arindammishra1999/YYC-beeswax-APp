import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View } from "react-native";
import React from "react";

import CartPage from "./CartPage";
import HomePage from "./HomePage";
import MorePage from "./MorePage";
import ProfilePage from "./ProfilePage";

import { colors } from "@/consts/styles";
import { viewportHeight, viewportWidth } from "@/consts/viewport";
import { navbarStyles } from "@/styles/components/navbarStyles";

const Tab = createBottomTabNavigator();

export default function Layout() {
    return (
        <View
            style={
                Platform.OS === "ios"
                    ? { flex: 1 }
                    : {
                          width: viewportWidth,
                          height: viewportHeight,
                      }
            }
        >
            <Tab.Navigator
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
                    },
                }}
            >
                <Tab.Screen
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
                    name="HomePage"
                    component={HomePage}
                />
                <Tab.Screen
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
                    name="CartPage"
                    component={CartPage}
                />
                <Tab.Screen
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
                    name="MorePage"
                    component={MorePage}
                />
                <Tab.Screen
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
                    name="ProfilePage"
                    component={ProfilePage}
                />
            </Tab.Navigator>
        </View>
    );
}
