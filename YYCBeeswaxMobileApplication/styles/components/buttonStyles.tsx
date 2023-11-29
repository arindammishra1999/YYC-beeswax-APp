import {StyleSheet} from 'react-native';
import {colors} from "@/consts/styles";

export const buttonStyles = StyleSheet.create({
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
