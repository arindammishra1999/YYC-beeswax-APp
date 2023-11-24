import { StyleSheet } from 'react-native';
import { colors } from '../consts/styles';

export const headerStyles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.grey,
        letterSpacing: 1,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    }
});
