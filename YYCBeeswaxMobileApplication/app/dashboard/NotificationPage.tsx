import React, { useEffect, useState } from "react";
import { notificationPageStyles } from "../../styles/notificationPageStyles";
import {
    Switch,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { default as Header } from "../../components/header";
import { mainStyles } from "../../styles/mainStyles";
import { colors } from "../../consts/styles";
import * as SecureStore from "expo-secure-store";

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

    const showChangesSavedMesssage = () =>
        Alert.alert("Success!", "Your changes have been saved.", [
            { text: "OK" },
        ]);

    useEffect(() => {
        const loadNotificationSettings = async () => {
            const general = "1";
            const sounds = "2";
            const vibration = "3";
            const promotions = "4";
            const discounts = "5";

            const generalToggle = await SecureStore.getItemAsync(general);
            const soundsToggle = await SecureStore.getItemAsync(sounds);
            const vibrationToggle = await SecureStore.getItemAsync(vibration);
            const promotionsToggle = await SecureStore.getItemAsync(promotions);
            const discountsToggle = await SecureStore.getItemAsync(discounts);

            setCommonSetting([
                {
                    name: "General Notifications",
                    key: "1",
                    toggle: generalToggle === "true",
                },
                { name: "Sounds", key: "2", toggle: soundsToggle === "true" },
                {
                    name: "Vibration",
                    key: "3",
                    toggle: vibrationToggle === "true",
                },
            ]);

            setPromotionSetting([
                {
                    name: "Promotions",
                    key: "4",
                    toggle: promotionsToggle === "true",
                },
                {
                    name: "Discounts",
                    key: "5",
                    toggle: discountsToggle === "true",
                },
            ]);
        };

        loadNotificationSettings();
    }, []);

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

    const handleConfirmChanges = async () => {
        const general = "1";
        const sounds = "2";
        const vibration = "3";
        const promotions = "4";
        const discounts = "5";

        await SecureStore.setItemAsync(
            general,
            (
                commonSettings.find((setting) => setting.key === general)
                    ?.toggle || false
            ).toString()
        );
        await SecureStore.setItemAsync(
            sounds,
            (
                commonSettings.find((setting) => setting.key === sounds)
                    ?.toggle || false
            ).toString()
        );
        await SecureStore.setItemAsync(
            vibration,
            (
                commonSettings.find((setting) => setting.key === vibration)
                    ?.toggle || false
            ).toString()
        );
        await SecureStore.setItemAsync(
            promotions,
            (
                promotionSettings.find((setting) => setting.key === promotions)
                    ?.toggle || false
            ).toString()
        );
        await SecureStore.setItemAsync(
            discounts,
            (
                promotionSettings.find((setting) => setting.key === discounts)
                    ?.toggle || false
            ).toString()
        );
        showChangesSavedMesssage();
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
            <TouchableOpacity
                style={notificationPageStyles.button}
                onPress={handleConfirmChanges}
            >
                <Text style={notificationPageStyles.buttonText}>
                    Confirm Changes
                </Text>
            </TouchableOpacity>
        </View>
    );
}
