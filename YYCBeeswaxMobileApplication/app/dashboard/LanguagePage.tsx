import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { languagePageStyles } from "../../styles/languagePageStyles";
import * as SecureStore from "expo-secure-store";
import WarningHeader from "@/components/warningHeader";
import { router } from "expo-router";

const LanguageSelectionPage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [changesMade, setChangesMade] = useState(false);
    const availableLanguages = [
        "English",
        "Nederlands (Dutch)",
        "Français (French)",
        "Deutsch (German)",
        "हिंदी (Hindi)",
        "Italiano (Italian)",
        "日本語 (Japanese)",
        "한국인 (Korean)",
        "普通话 (Mandarin)",
        "Português (Portuguese)",
        "Русский (Russian)",
        "Español (Spanish)",
        "Türkçe (Turkish)",
        "Tiếng Việt (Vietnamese)",
    ];

    const showChangesSavedMesssage = () =>
        Alert.alert("Success!", "Your changes have been saved.", [
            { text: "OK" },
        ]);

    const handleLanguageChange = (language: string) => {
        setChangesMade(true);
        setSelectedLanguage(language);
    };

    const handleConfirmChange = async () => {
        await SecureStore.setItemAsync("language", selectedLanguage);
        showChangesSavedMesssage();
        setChangesMade(false);
    };

    useEffect(() => {
        const loadLanguageSettings = async () => {
            const savedLanguage = await SecureStore.getItemAsync("language");
            const languageToSet = savedLanguage ?? "English";
            setSelectedLanguage(languageToSet);
        };

        loadLanguageSettings();
    }, []);

    const handleBackPress = () => {
        if (changesMade) {
            Alert.alert(
                "Unsaved Changes!",
                "Are you sure you want to leave this page? Changes you have made will not be saved.",
                [
                    { text: "Cancel" },
                    { text: "Leave", onPress: () => router.back() },
                ]
            );
        } else {
            router.back();
        }
    };

    return (
        <View style={languagePageStyles.container}>
            <WarningHeader header="Language" onPress={handleBackPress} />
            <View>
                <Text style={languagePageStyles.sectionHeader}>
                    Available Languages
                </Text>
            </View>
            <ScrollView style={languagePageStyles.languageList}>
                {availableLanguages.map((language) => (
                    <View
                        key={language}
                        style={languagePageStyles.languageContainer}
                    >
                        <Text
                            style={
                                (languagePageStyles.languageText,
                                selectedLanguage === language &&
                                    languagePageStyles.selectedLanguageContainer)
                            }
                        >
                            {language}
                        </Text>
                        <TouchableOpacity
                            style={[
                                languagePageStyles.circleButton,
                                selectedLanguage === language
                                    ? [
                                          languagePageStyles.yellowCircle,
                                          languagePageStyles.circleTouchable,
                                      ]
                                    : languagePageStyles.clearCircle,
                            ]}
                            onPress={() => handleLanguageChange(language)}
                            disabled={selectedLanguage === language}
                            hitSlop={{
                                top: 30,
                                bottom: 30,
                                left: 30,
                                right: 30,
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={languagePageStyles.bottomContainer}>
                <TouchableOpacity
                    style={[
                        languagePageStyles.bottomButton,
                        !changesMade && languagePageStyles.buttonDisabled,
                    ]}
                    onPress={handleConfirmChange}
                    disabled={!changesMade}
                >
                    <Text style={languagePageStyles.buttonText}>
                        Save Changes
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LanguageSelectionPage;
