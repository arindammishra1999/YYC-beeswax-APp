import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import WarningHeader from "@/components/warningHeader";
import { languagePageStyles } from "@/styles/languagePageStyles";
import { mainStyles } from "@/styles/mainStyles";

const LanguageSelectionPage = () => {
    const { t, i18n } = useTranslation();
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

    type LanguageName =
        | "English"
        | "Nederlands (Dutch)"
        | "Français (French)"
        | "Deutsch (German)"
        | "हिंदी (Hindi)"
        | "Italiano (Italian)"
        | "日本語 (Japanese)"
        | "한국인 (Korean)"
        | "普通话 (Mandarin)"
        | "Português (Portuguese)"
        | "Русский (Russian)"
        | "Español (Spanish)"
        | "Türkçe (Turkish)"
        | "Tiếng Việt (Vietnamese)";

    const languageMap: Record<LanguageName, string> = {
        English: "en",
        "Nederlands (Dutch)": "nl",
        "Français (French)": "fr",
        "Deutsch (German)": "de",
        "हिंदी (Hindi)": "hi",
        "Italiano (Italian)": "it",
        "日本語 (Japanese)": "ja",
        "한국인 (Korean)": "ko",
        "普通话 (Mandarin)": "zh",
        "Português (Portuguese)": "pt",
        "Русский (Russian)": "ru",
        "Español (Spanish)": "es",
        "Türkçe (Turkish)": "tr",
        "Tiếng Việt (Vietnamese)": "vi",
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        setChangesMade(true);
    };

    const showChangesSavedMesssage = () =>
        Alert.alert(t("Success"), t("ChangesSaved"), [{ text: t("ok") }]);

    const handleConfirmChange = async () => {
        await SecureStore.setItemAsync("language", selectedLanguage);
        const languageCode = languageMap[selectedLanguage];
        i18n.changeLanguage(languageCode);
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
            Alert.alert(t("discardChanges"), t("unsavedChanges"), [
                {
                    text: t("dontLeave"),
                    style: "cancel",
                    onPress: () => {},
                },
                {
                    text: t("discard"),
                    style: "destructive",
                    onPress: () => router.back(),
                },
            ]);
        } else {
            router.back();
        }
    };

    return (
        <View style={mainStyles.container}>
            <WarningHeader header={t("language")} onPress={handleBackPress} />
            <View>
                <Text style={languagePageStyles.sectionHeader}>
                    {t("availableLanguages")}
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
                        {t("saveChangesButton")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LanguageSelectionPage;
