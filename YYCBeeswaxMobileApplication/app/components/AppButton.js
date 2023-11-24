import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import defaultStyles from "../styles/colorStyles";

function AppButton({ title, onPress, color = "primary" }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: defaultStyles.colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "100%",
        marginVertical: 10,
    },
    text: {
        color: defaultStyles.colors.white,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
});

export default AppButton;
