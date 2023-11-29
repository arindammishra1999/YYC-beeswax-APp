import React, {useState} from "react";
import {inputStyles} from "@/styles/components/inputStyles";
import {Text, TextInput, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

type Props = {
    label: string
    placeholder: string
    value?: string,
    onChangeText?: (value: string) => void
}

function HideableInput(props: Props) {
    const [hide, setHide] = useState(true)
    const hideIconName = hide ? 'eye-slash' : 'eye'
    return (
        <View style={inputStyles.inputContainer}>
            <Text style={inputStyles.label}>{props.label}</Text>
            <View style={inputStyles.input}>
                <TextInput style={inputStyles.inputHideable} placeholder={props.placeholder} value={props.value}
                           onChangeText={props.onChangeText} secureTextEntry={hide}/>
                <FontAwesome name={hideIconName} size={20} onPress={() => setHide(prev => !prev)}/>
            </View>
        </View>
    );
}

export default HideableInput