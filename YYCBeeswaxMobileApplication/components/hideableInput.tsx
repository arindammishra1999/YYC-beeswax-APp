import React, {useState} from "react";
import {Input} from "@rneui/themed";
import {FontAwesome} from "@expo/vector-icons";
import {inputStyles} from "@/styles/components/inputStyles";

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
        <Input label={props.label} placeholder={props.placeholder}
               value={props.value} onChangeText={props.onChangeText}
               labelStyle={inputStyles.labelStyle}
               inputContainerStyle={inputStyles.inputContainerStyle}
               inputStyle={inputStyles.inputStyle}
               rightIcon={<FontAwesome name={hideIconName} size={20} onPress={() => setHide(prev => !prev)}/>}
               secureTextEntry={hide}/>
    );
}

export default HideableInput