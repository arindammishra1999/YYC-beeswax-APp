import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
    Switch,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";

import WarningHeader from "@/app/components/warningHeader";
import { colors } from "@/consts/styles";
import { mainStyles } from "@/styles/mainStyles";
import { notificationPageStyles } from "@/styles/notificationPageStyles";

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
    const [changesMade, setChangesMade] = useState(false);

    const showChangesSavedMesssage = () =>
        Alert.alert("Success!", "Your changes have been saved.", [
            { text: "OK" },
        ]);

    useEffect(() => {
        const loadNotificationSettings = async () => {
            const generalToggle = await SecureStore.getItemAsync("1");
            const soundsToggle = await SecureStore.getItemAsync("2");
            const vibrationToggle = await SecureStore.getItemAsync("3");
            const promotionsToggle = await SecureStore.getItemAsync("4");
            const discountsToggle = await SecureStore.getItemAsync("5");

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
        setChangesMade(true);
        if (settingType === "common") {
            setCommonSetting((prevSettings) =>
                prevSettings.map((setting) =>
                    setting.key === key
                        ? { ...setting, toggle: !setting.toggle }
                        : setting,
                ),
            );
        } else if (settingType === "promotion") {
            setPromotionSetting((prevSettings) =>
                prevSettings.map((setting) =>
                    setting.key === key
                        ? { ...setting, toggle: !setting.toggle }
                        : setting,
                ),
            );
        }
    };

    const handleConfirmChanges = async () => {
        const settingsToSet = [
            { key: "1", settings: commonSettings },
            { key: "2", settings: commonSettings },
            { key: "3", settings: commonSettings },
            { key: "4", settings: promotionSettings },
            { key: "5", settings: promotionSettings },
        ];

        for (const { key, settings } of settingsToSet) {
            const setting = settings.find((setting) => setting.key === key);
            const value = (setting?.toggle ?? false).toString();
            await SecureStore.setItemAsync(key, value);
        }
        showChangesSavedMesssage();
        setChangesMade(false);
    };

    const handleBackPress = () => {
        if (changesMade) {
            Alert.alert(
                "Discard Changes?",
                "You have unsaved changes. Are you sure you want to discard them and leave this screen?",
                [
                    {
                        text: "Don't Leave",
                        style: "cancel",
                        onPress: () => {},
                    },
                    {
                        text: "Discard",
                        style: "destructive",
                        onPress: () => router.back(),
                    },
                ],
            );
        } else {
            router.back();
        }
    };

    return (
        <View style={mainStyles.container}>
            <WarningHeader header="Notifications" onPress={handleBackPress} />
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
                            thumbColor={colors.white}
                        />
                    </View>
                ))}
                <View style={notificationPageStyles.divider} />
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
                            thumbColor={colors.white}
                        />
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={[
                    notificationPageStyles.button,
                    !changesMade && notificationPageStyles.buttonDisabled,
                ]}
                onPress={handleConfirmChanges}
                disabled={!changesMade}
            >
                <Text style={notificationPageStyles.buttonText}>
                    Save Changes
                </Text>
            </TouchableOpacity>
        </View>
    );
}
