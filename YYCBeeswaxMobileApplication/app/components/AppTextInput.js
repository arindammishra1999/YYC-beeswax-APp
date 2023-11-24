import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import defaultStyles from "../styles/colorStyles";
import textStyles from "../styles/textInputStyles";

function AppTextInput({ ...otherProps }) {
    return (
        <View style={textStyles.container}>
            <TextInput style={[defaultStyles.text, textStyles.fullFill]} {...otherProps} />
        </View>
    );
}

export default AppTextInput;
