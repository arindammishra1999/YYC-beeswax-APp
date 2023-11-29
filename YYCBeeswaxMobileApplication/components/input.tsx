import React from "react";
import {Input as RNEInput} from "@rneui/themed";
import {inputStyles} from "@/styles/components/inputStyles";

type Props = {
    label: string
    placeholder: string
    value?: string,
    onChangeText?: (value: string) => void
}

function Input(props: Props) {
    return (
        <RNEInput label={props.label} placeholder={props.placeholder}
                  value={props.value}
                  onChangeText={props.onChangeText}
                  labelStyle={inputStyles.labelStyle}
                  inputContainerStyle={inputStyles.inputContainerStyle}
                  inputStyle={inputStyles.inputStyle}/>
    );
}

export default Input