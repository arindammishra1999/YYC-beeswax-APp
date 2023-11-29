import {StyleSheet} from 'react-native';
import {colors} from '@/consts/styles';

export const profilePageStyles = StyleSheet.create({
    button: {
        backgroundColor: colors.yellow,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginTop: '15%',
        marginLeft: '25%',
        marginRight: '25%',
    },
    buttonText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
    messageText: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 21,
        fontWeight: 'bold',
        marginTop: '40%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%'
    },
    signUpText: {
        fontSize: 16,
    },
    signUpLink: {
        fontSize: 16,
        color: colors.blue,
    },
});