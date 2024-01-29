import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { inputStyles } from "@/styles/components/inputStyles";

type Props = {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText?: (value: string) => void;
};

function HideableInput(props: Props) {
    const [hide, setHide] = useState(true);
    const hideIconName = hide ? "eye-slash" : "eye";
    return (
        <View style={inputStyles.inputContainer}>
            <Text style={inputStyles.label}>{props.label}</Text>
            <View style={inputStyles.input}>
                <TextInput
                    style={inputStyles.inputHideable}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    secureTextEntry={hide}
                    autoCapitalize="none"
                />
                <FontAwesome
                    name={hideIconName}
                    size={20}
                    onPress={() => setHide((prev) => !prev)}
                />
            </View>
        </View>
    );
}

export default HideableInput;
