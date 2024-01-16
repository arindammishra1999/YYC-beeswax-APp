import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "@/consts/styles";

type Props = {
    label: string;
    iconName: string;
    onPress: () => void;
};

export default function MoreOption(props: Props) {
    return (
        <TouchableOpacity
            style={styles.optionContainer}
            onPress={props.onPress}
        >
            <View style={styles.option}>
                <Icon
                    style={styles.optionIcon}
                    color="black"
                    name={props.iconName}
                />
                <Text style={styles.optionLabel}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    optionIcon: {
        fontSize: 35,
        marginLeft: 10,
    },
    option: {
        paddingVertical: 4,
        flexDirection: "row",
        textAlignVertical: "center",
    },
    optionLabel: {
        alignSelf: "center",
        fontSize: 20,
        marginLeft: 15,
    },
    optionContainer: {
        borderRadius: 8,
        borderColor: colors.lightGrey,
        width: "90%",
        alignSelf: "center",
        marginBottom: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: colors.white,
        paddingVertical: 5,
        elevation: 3,
    },
});
