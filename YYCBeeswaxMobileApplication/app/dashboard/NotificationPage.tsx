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
        await SecureStore.setItemAsync(
            "1",
            (
                commonSettings.find((setting) => setting.key === "1")?.toggle ||
                false
            ).toString()
        );
        await SecureStore.setItemAsync(
            "2",
            (
                commonSettings.find((setting) => setting.key === "2")?.toggle ||
                false
            ).toString()
        );
        await SecureStore.setItemAsync(
            "3",
            (
                commonSettings.find((setting) => setting.key === "3")?.toggle ||
                false
            ).toString()
        );
        await SecureStore.setItemAsync(
            "4",
            (
                promotionSettings.find((setting) => setting.key === "4")
                    ?.toggle || false
            ).toString()
        );
        await SecureStore.setItemAsync(
            "5",
            (
                promotionSettings.find((setting) => setting.key === "5")
                    ?.toggle || false
            ).toString()
        );
        showChangesSavedMesssage();
        setChangesMade(false);
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
                style={[
                    notificationPageStyles.button,
                    !changesMade && notificationPageStyles.buttonDisabled,
                ]}
                onPress={handleConfirmChanges}
                disabled={!changesMade}
            >
                <Text style={notificationPageStyles.buttonText}>
                    Confirm Changes
                </Text>
            </TouchableOpacity>
        </View>
    );
}
