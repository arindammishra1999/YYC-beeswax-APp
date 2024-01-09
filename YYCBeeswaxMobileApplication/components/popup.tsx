import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { popupStyles } from "@/styles/components/popupStyles";

type Props = {
    title?: string;
    subTitle?: string;
    option1Text: string;
    option2Text: string;
    option1Action: () => void;
    option2Action: () => void;
    visible: boolean;
    changeVisibility?: (value: boolean) => void;
};

export default function Popup(props: Props) {
    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            transparent={true}
            onRequestClose={() =>
                props.changeVisibility && props.changeVisibility(false)
            }
        >
            <View style={popupStyles.viewContainer}>
                <TouchableWithoutFeedback
                    onPress={() =>
                        props.changeVisibility && props.changeVisibility(false)
                    }
                >
                    <View style={popupStyles.touchableOverlay}></View>
                </TouchableWithoutFeedback>
                <View style={popupStyles.popupView}>
                    {props.title && (
                        <Text style={popupStyles.popupTitle}>
                            {props.title}
                        </Text>
                    )}
                    {props.subTitle && (
                        <Text style={popupStyles.popupSubTitle}>
                            {props.subTitle}
                        </Text>
                    )}
                    <View style={popupStyles.buttonContainer}>
                        <TouchableOpacity
                            style={popupStyles.button}
                            onPress={props.option1Action}
                        >
                            <Text style={popupStyles.buttonTextStyle}>
                                {props.option1Text}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={popupStyles.button}
                            onPress={props.option2Action}
                        >
                            <Text style={popupStyles.buttonTextStyle}>
                                {props.option2Text}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
