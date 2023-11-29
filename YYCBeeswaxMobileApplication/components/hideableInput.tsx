import React, {useState} from "react";
import {Input} from "@rneui/themed";
import {FontAwesome} from "@expo/vector-icons";

type Props = {
    label: string
    placeholder: string
    value?: string,
    onChangeText?: (value: string) => void
}

function HideableInput(props: Props) {
    const [hide, setHide] = useState(true)
    return (
        <Input label={props.label} placeholder={props.placeholder}
               value={props.value} onChangeText={props.onChangeText}
               labelStyle={{paddingBottom: 8}}
               inputContainerStyle={{
                   borderRadius: 8,
                   paddingHorizontal: 15,
                   borderWidth: 1,
                   borderColor: 'lightgray',
               }}
               inputStyle={{
                   fontSize: 14
               }}
               rightIcon={hide ?
                   <FontAwesome name={'eye-slash'} size={20} onPress={() => setHide(prev => !prev)}/>
                   :
                   <FontAwesome name={'eye'} size={20} onPress={() => setHide(prev => !prev)}/>
               }
               secureTextEntry={hide}/>
    );
}

export default HideableInput