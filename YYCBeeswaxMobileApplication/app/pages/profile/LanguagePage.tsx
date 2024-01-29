import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import WarningHeader from "@/app/components/warningHeader";
import { languagePageStyles } from "@/styles/languagePageStyles";
import { mainStyles } from "@/styles/mainStyles";

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
            <WarningHeader header="Language" onPress={handleBackPress} />
            <View>
                <Text style={languagePageStyles.sectionHeader}>
                    Available Languages
                </Text>
            </View>
            <ScrollView style={languagePageStyles.languageList}>
                {availableLanguages.map((language) => (
                    <TouchableOpacity
                        key={language}
                        onPress={() => handleLanguageChange(language)}
                        disabled={selectedLanguage === language}
                    >
                        <View style={languagePageStyles.languageContainer}>
                            <Text
                                style={[
                                    languagePageStyles.languageText,
                                    selectedLanguage === language &&
                                        languagePageStyles.selectedLanguageText,
                                ]}
                            >
                                {language}
                            </Text>
                            <View>
                                <View
                                    style={[
                                        languagePageStyles.circleButton,
                                        selectedLanguage === language
                                            ? languagePageStyles.yellowCircle
                                            : languagePageStyles.clearCircle,
                                    ]}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
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
