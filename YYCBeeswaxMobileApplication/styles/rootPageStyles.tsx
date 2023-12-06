import { colors } from '@/consts/styles';
import {StyleSheet} from 'react-native';

export const rootPageStyles = StyleSheet.create({
    image: {
        width: '80%',
    },
    caption: {height: 300},
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 10,
        marginBottom: 20
    },
    button: {
        flex: 1
    },
    textGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupLinkText: {
        fontSize: 16,
        color: colors.blue,
    },
    signupText: {
        fontSize: 16,
    },
});