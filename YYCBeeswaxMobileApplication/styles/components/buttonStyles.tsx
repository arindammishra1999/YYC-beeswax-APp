import {StyleSheet} from 'react-native';
import {colors} from "@/consts/styles";

export const buttonStyles = StyleSheet.create({
    labelStyle: {paddingBottom: 8},
    inputContainerStyle: {
        borderRadius: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'lightgray',
        height: 55,
    },
    inputStyle: {
        fontSize: 14
    },
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
});
