import React from "react";
import {Input as RNEInput} from "@rneui/themed";

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
                  labelStyle={{paddingBottom: 8}}
                  inputContainerStyle={{
                      borderRadius: 8,
                      paddingHorizontal: 15,
                      borderWidth: 1,
                      borderColor: 'lightgray',
                      height:55,
                  }}
                  inputStyle={{
                      fontSize: 14
                  }}/>
    );
}

export default Input