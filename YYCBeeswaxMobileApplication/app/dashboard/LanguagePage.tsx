import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import Header from "../../components/header";
import { accountStyles } from "../../styles/accountStyles";
import { headerStyles } from "../../styles/components/headerStyles";
import NavBar from "../../components/navbar";
import Button from "../../components/button";

const LanguageSelectionPage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const availableLanguages = [
        "English",
        "French",
        "Spanish",
        "German",
        "Chinese",
    ];

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
    };

    const handleConfirmChange = () => {
        // Add logic to confirm and save the selected language
        console.log(`Selected language: ${selectedLanguage}`);
    };

    return (
        <View style={styles.container}>
            <Header header="Language" />
            <View>
                <Text style={styles.sectionHeader}>Available Languages:</Text>
            </View>
            <ScrollView style={styles.languageList}>
                {availableLanguages.map((language) => (
                    <View key={language} style={styles.languageContainer}>
                        <Text style={styles.languageText}>{language}</Text>
                        <TouchableOpacity
                            style={[
                                styles.circleButton,
                                selectedLanguage === language
                                    ? styles.blueCircle
                                    : styles.clearCircle,
                            ]}
                            onPress={() => handleLanguageChange(language)}
                            disabled={selectedLanguage === language}
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Button title="Confirm Changes" onPress={handleConfirmChange} />
                <NavBar />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
    },
    languageList: {
        flex: 1,
    },
    languageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    languageText: {
        fontSize: 16,
    },
    circleButton: {
        width: 30,
        height: 30,
        borderRadius: 15, // half of width and height to create a circle
        borderWidth: 1,
        borderColor: "#007BFF",
        marginLeft: 10,
    },
    blueCircle: {
        backgroundColor: "#007BFF",
    },
    clearCircle: {
        backgroundColor: "transparent",
    },
    sectionHeader: {
        fontSize: 18,
        marginBottom: 10,
    },
    bottomContainer: {
        justifyContent: "flex-end",
    },
});

export default LanguageSelectionPage;
