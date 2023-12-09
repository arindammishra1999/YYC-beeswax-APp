import React, { useState } from "react";
import { notificationPageStyles } from "../../styles/notificationPageStyles";
import { Switch, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { default as Header } from "../../components/header";
import { mainStyles } from "../../styles/mainStyles";
import { colors } from "../../consts/styles";

export default function NotificationsPage() {
    const [commonSettings, setCommonSetting] = useState([
        { name: "General Notifications", key: "1", toggle: false },
        { name: "Sounds", key: "2", toggle: false },
        { name: "Vibration", key: "3", toggle: false },
    ]);
    const [promotionSettings, setPromotionSetting] = useState([
        { name: "Promotions", key: "4", toggle: false },
        { name: "Discounts", key: "5", toggle: false },
    ]);

    const toggleSwitch = (key: string, settingType: string) => {
        if (settingType === "common") {
            setCommonSetting((prevSettings) =>
                prevSettings.map((setting) =>
                    setting.key === key
                        ? { ...setting, toggle: !setting.toggle }
                        : setting
                )
            );
        } else if (settingType === "promotion") {
            setPromotionSetting((prevSettings) =>
                prevSettings.map((setting) =>
                    setting.key === key
                        ? { ...setting, toggle: !setting.toggle }
                        : setting
                )
            );
        }
    };

    return (
        <View style={mainStyles.container}>
            <Header header="Notifications" />
            <ScrollView>
                <Text style={notificationPageStyles.header}>Common</Text>
                {commonSettings.map((item) => (
                    <View style={notificationPageStyles.item} key={item.key}>
                        <Text style={notificationPageStyles.itemTitle}>
                            {item.name}
                        </Text>
                        <Switch
                            style={notificationPageStyles.itemToggle}
                            onValueChange={() =>
                                toggleSwitch(item.key, "common")
                            }
                            value={item.toggle}
                            trackColor={{
                                false: colors.white,
                                true: colors.yellow,
                            }}
                        />
                    </View>
                ))}
                <View style={notificationPageStyles.divider}></View>
                <Text style={notificationPageStyles.header}>Promotions</Text>
                {promotionSettings.map((item) => (
                    <View style={notificationPageStyles.item} key={item.key}>
                        <Text style={notificationPageStyles.itemTitle}>
                            {item.name}
                        </Text>
                        <Switch
                            style={notificationPageStyles.itemToggle}
                            onValueChange={() =>
                                toggleSwitch(item.key, "promotion")
                            }
                            value={item.toggle}
                            trackColor={{
                                false: colors.white,
                                true: colors.yellow,
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={notificationPageStyles.button}>
                <Text style={notificationPageStyles.buttonText}>
                    Confirm Changes
                </Text>
            </TouchableOpacity>
        </View>
    );
}
